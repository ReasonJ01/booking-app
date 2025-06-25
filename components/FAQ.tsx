'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion";
import Link from "next/link";

const faqs = [
    {
        question: "How long do gel nails typically last?",
        answer: "Gel enhancements typically last 3-4 weeks with proper care. However, it's recommended to have infills every 2-3 weeks to maintain their appearance and strength. The longevity can vary based on factors like your natural nail growth rate, daily activities, and how well you follow aftercare instructions."
    },
    {
        question: "How should I care for my nails between appointments?",
        answer: "To maintain your nails between appointments:\n\n• Apply cuticle oil daily\n• Wear gloves for cleaning and washing dishes\n• Avoid using your nails as tools\n• Keep your hands moisturized\n• Don't pick or peel at your gel\n• If you notice any lifting, book in for a repair to prevent further damage"
    },
    {
        question: "What's the difference between Builder Gel and Hard Gel?",
        answer: "Builder Gel is more flexible and ideal for natural nail overlays. It's perfect for those wanting to grow their natural nails while adding strength. Hard Gel is more rigid and durable, making it better for extensions and those who are harder on their nails. Hard Gel is also great for those with weak or brittle nails needing extra protection."
    },
    {
        question: "What are your prices for nail services?",
        answer: <>You can find my complete price list with all available services and add-ons on my Price List page. I offer a range of services from basic manicures to luxury nail art designs.{'\n\n'}<Link href="/price-list" className="text-primary hover:underline">View the full Price List →</Link></>
    },
    {
        question: "How should I care for my nails after my appointment?",
        answer: <>Proper aftercare is crucial for maintaining the longevity and beauty of your nails. I&apos;ve created a comprehensive aftercare guide that covers everything from daily maintenance to what products to use and avoid.{'\n\n'}<Link href="/aftercare" className="text-primary hover:underline">Check out my detailed Aftercare Guide →</Link></>
    },
    {
        question: "What is your cancellation policy?",
        answer: <>I understand that plans can change, but I kindly ask that you familiarize yourself with my booking policies. These include details about cancellations, deposits, and late arrivals.{'\n\n'}<Link href="/policies" className="text-primary hover:underline">Read my full Policies →</Link></>
    },
    {
        question: "How long do appointments typically take?",
        answer: "Appointment duration varies depending on the service:\n- Full Set: 2-2.5 hours\n- Infills: 1.5-2 hours\n- Removal: 45-60 minutes\n\nPlease allow extra time for nail art or repairs."
    },
    {
        question: "Do you use hypoallergenic products?",
        answer: "Yes! I prioritize your nail health and use professional-grade, hypoallergenic products. All my services are performed with high-quality, gentle products suitable for sensitive skin."
    },
    {
        question: "How often should I get infills?",
        answer: "For optimal maintenance, I recommend getting infills every 2-3 weeks. This helps maintain the strength and appearance of your nails while preventing lifting or damage."
    }
];

export default function FAQ() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center"
        >
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="font-playfair text-3xl font-bold sm:text-4xl lg:text-5xl text-center mb-4"
            >
                Frequently Asked <span className="font-light">Questions</span>
            </motion.h1>
            <div className="w-full">
                <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`faq-${index}`}
                            className="border-2 border-primary/30 rounded-lg px-6 py-2 bg-background/50 backdrop-blur-sm shadow-md"
                        >
                            <AccordionTrigger className="hover:no-underline py-4">
                                <span className="font-medium text-left">{faq.question}</span>
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground whitespace-pre-line">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </motion.div>
    )
} 