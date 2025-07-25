"use server";
import { db } from "./db";
import { bookingFlowQuestion, bookingFlowOption, bookingFlowOptionService, service } from "./schema";


export const getFAQS = async () => {
    const faqs = await db.query.faq.findMany({
        orderBy: (faq, { desc }) => [desc(faq.order)]
    });
    return faqs;
}

export const getReviews = async () => {
    const reviews = await db.query.review.findMany({
        where: (review, { eq }) => eq(review.isApproved, true),
        orderBy: (review, { desc }) => [desc(review.reviewDate)]
    });
    return reviews;
}

export const getImages = async () => {
    try {
        const images = await db.query.image.findMany({
            where: (image, { eq }) => eq(image.carousel, true),
            orderBy: (image, { desc }) => [desc(image.createdAt)]
        });
        return images;
    } catch (error) {
        console.error("Failed to fetch images", error);
        return [];
    }

}

export const getBookingFlow = async () => {
    try {
        // Get all questions
        const questions = await db.select().from(bookingFlowQuestion).orderBy(bookingFlowQuestion.order);

        // Get all options
        const options = await db.select().from(bookingFlowOption).orderBy(bookingFlowOption.order);

        // Get all option-service links
        const optionServices = await db.select().from(bookingFlowOptionService);

        // Get all services
        const services = await db.select().from(service);

        // Group services by optionId
        const servicesByOption: Record<string, typeof services> = {};
        for (const os of optionServices) {
            const svc = services.find(s => s.id === os.serviceId);
            if (!svc) continue;
            if (!servicesByOption[os.optionId]) servicesByOption[os.optionId] = [];
            servicesByOption[os.optionId].push(svc);
        }

        // Group options by questionId and attach services to each option
        type OptionWithServices = (typeof options)[0] & { services: typeof services };
        const optionsByQuestion: Record<string, OptionWithServices[]> = {};
        for (const option of options) {
            const optionWithServices = { ...option, services: servicesByOption[option.id] || [] };
            if (!optionsByQuestion[option.questionId]) optionsByQuestion[option.questionId] = [];
            optionsByQuestion[option.questionId].push(optionWithServices);
        }

        // Attach options to questions
        return questions.map(q => ({
            ...q,
            options: optionsByQuestion[q.id] || []
        }));
    } catch (error) {
        console.error("Failed to fetch booking flow:", error);
        return [];
    }
};