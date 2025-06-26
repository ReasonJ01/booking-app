'use client'

import { motion } from "framer-motion";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { review } from "@/lib/schema";

type Review = typeof review.$inferSelect;

const autoplay = Autoplay({
    delay: 4000,
    stopOnInteraction: false
});



export default function Reviews() {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        fetch('/api/reviews')
            .then(res => res.json())
            .then(setReviews)
    }, [])

    // Duplicate reviews to ensure at least 5 are shown
    const getDisplayReviews = () => {
        if (reviews.length === 0) return [];
        if (reviews.length >= 5) return reviews;

        const duplicatedReviews = [...reviews];
        while (duplicatedReviews.length < 5) {
            const reviewToDuplicate = reviews[duplicatedReviews.length % reviews.length];
            duplicatedReviews.push({
                ...reviewToDuplicate,
                id: `${reviewToDuplicate.id}-duplicate-${duplicatedReviews.length}`,
                comment: reviewToDuplicate.comment,
            });
        }
        return duplicatedReviews;
    };

    const displayReviews = getDisplayReviews();

    return (
        <div className="w-full relative z-10">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="font-playfair text-3xl font-bold sm:text-4xl lg:text-5xl text-center mb-4"
            >
                Client <span className="font-light">Reviews</span>
            </motion.h1>

            <div className="flex flex-col items-center w-full">
                <div className="w-full max-w-5xl relative">
                    {/* Left opacity gradient overlay for large screens (Tailwind version) */}
                    <div className="hidden lg:block absolute left-0 top-0 h-full w-40 z-20 pointer-events-none bg-gradient-to-r from-background via-background/80 to-transparent" />
                    {/* Right opacity gradient overlay for large screens (Tailwind version) */}
                    <div className="hidden lg:block absolute right-0 top-0 h-full w-40 z-20 pointer-events-none bg-gradient-to-l from-background via-background/80 to-transparent" />
                    <Carousel className="w-full" opts={{
                        align: "center",
                        loop: true,
                    }}
                        plugins={[autoplay]}>
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {displayReviews.map((review, index) => (
                                <CarouselItem key={index} className="pl-2 md:pl-4 basis-[85%] md:basis-1/2">
                                    <div className="p-1">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Card className="border-2 border-primary/30 bg-background/50 backdrop-blur-sm shadow-lg hover:border-primary/50 transition-colors duration-300">
                                                <CardContent className="p-6">
                                                    <p className="text-muted-foreground italic mb-4">&ldquo;{review.comment}&rdquo;</p>
                                                    <div className="flex flex-col gap-1">
                                                        <p className="font-medium text-foreground">{review.name}</p>
                                                        <p className="text-sm text-muted-foreground">{review.reviewDate ? new Date(review.reviewDate).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : ''}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </div>
    )
} 