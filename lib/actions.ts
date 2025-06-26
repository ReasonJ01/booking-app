import { db } from "./db";

export async function getFaqs() {
    const faqs = await db.query.faq.findMany({
        orderBy: (faq, { asc }) => [asc(faq.order)]
    });
    return faqs;
}