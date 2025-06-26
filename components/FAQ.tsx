"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect, useState } from "react";
import Link from "next/link";

type FAQ = {
    id: string;
    question: string;
    answer: string;
    order: number;
    createdAt: Date | null;
    updatedAt: Date | null;
};

function parseMarkdownLinks(text: string) {
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
            const [, text, url] = match;
            return <Link key={i} href={url} className="text-foreground underline">{text}</Link>;
        }
        return part;
    });
}

export default function FAQ() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/faqs', {
            next: {
                revalidate: 60 * 5
            }
        })
            .then(res => res.json())
            .then(data => {
                setFaqs(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch FAQs:', err);
                setError('Failed to load FAQs');
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="text-center"></div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center">
            <h1 className="font-playfair text-3xl font-bold sm:text-4xl lg:text-5xl text-center mb-4">
                Frequently Asked <span className="font-light">Questions</span>
            </h1>
            <div className="w-full">
                <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`faq-${index}`}
                            className="border-2 border-primary/30 rounded-lg px-6 py-2 bg-background/50 backdrop-blur-sm shadow-md"
                        >
                            <AccordionTrigger className="hover:no-underline py-4">
                                <span className="font-semibold text-lg text-left">{faq.question}</span>
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground whitespace-pre-line">
                                {parseMarkdownLinks(faq.answer)}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
} 