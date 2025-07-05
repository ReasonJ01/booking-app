import { getImages } from "@/lib/actions";
import { NextResponse } from "next/server";


export async function GET() {
    const images = await getImages()
    return NextResponse.json(images)
}