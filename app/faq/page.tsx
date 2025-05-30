import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Footer from "@/components/Footer";

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
    }
];

export default function FAQ() {
    return (
        <div>
            <div className="min-h-[calc(100vh-4rem)] py-8 px-4 max-w-3xl mx-auto bg-background">
                <h1 className="font-playfair text-3xl font-bold sm:text-4xl lg:text-5xl text-center mb-8">
                    Frequently Asked <span className="font-light">Questions</span>
                </h1>
                <Card className="shadow-lg border border-ring/10">
                    <CardHeader>
                        <CardTitle className="text-2xl font-playfair">Common Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="space-y-4">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`faq-${index}`}
                                    className="border border-ring/10 rounded-lg px-4"
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
                    </CardContent>
                </Card>
            </div>
            <Footer />
            <div className="h-16"></div>
        </div>

    )
}