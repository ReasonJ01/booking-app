import { db } from "./db";


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