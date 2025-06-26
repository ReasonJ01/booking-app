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