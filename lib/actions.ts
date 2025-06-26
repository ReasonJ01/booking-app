import { db } from "./db";
import { unstable_cache } from "next/cache";

const FAQ_CACHE_TAG = "faqs";

export const getFaqs = unstable_cache(
    async () => {
        const faqs = await db.query.faq.findMany({
            orderBy: (faq, { asc }) => [asc(faq.order)]
        });
        return faqs;
    },
    ["faqs-list"],
    {
        tags: [FAQ_CACHE_TAG]
    }
);
