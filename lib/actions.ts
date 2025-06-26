import { db } from "./db";


export const getFAQS = async () => {
    const faqs = await db.query.faq.findMany({
        orderBy: (faq, { desc }) => [desc(faq.order)]
    });
    return faqs;
}

