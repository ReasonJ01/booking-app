import { getFAQS } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const faqs = await getFAQS();
        return NextResponse.json(faqs);
    } catch (error) {
        console.error('Failed to fetch FAQs:', error);
        return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
    }
} 