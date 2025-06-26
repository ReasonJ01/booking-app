import { getReviews } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function GET() {
    const reviews = await getReviews();
    return NextResponse.json(reviews);
}