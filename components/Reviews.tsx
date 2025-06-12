'use client'

import { motion } from "framer-motion";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

const reviews = [
    {
        name: "Sarah Thompson",
        date: "March 2024",
        comment: "Jessica is absolutely amazing at what she does! My nails have never looked better. Her attention to detail and precision is outstanding. The salon is so clean and welcoming too!"
    },
    {
        name: "Emma Roberts",
        date: "February 2024",
        comment: "I've been going to Jessica for months now and I wouldn't trust anyone else with my nails. Her work is consistently perfect and she's so knowledgeable about nail health."
    },
    {
        name: "Lauren Mitchell",
        date: "February 2024",
        comment: "Found my forever nail tech! Jessica takes such care with every detail and the results are always flawless. The designs she creates are exactly what I want every time."
    },
    {
        name: "Rachel Anderson",
        date: "January 2024",
        comment: "Such a relaxing experience every time. Jessica is not only talented but also so friendly and professional. My nails last for weeks and always look incredible!"
    },
    {
        name: "Olivia Parker",
        date: "January 2024",
        comment: "Best nail experience I've ever had! Jessica is an artist and takes such pride in her work. The hypoallergenic products she uses are perfect for my sensitive skin."
    }
];

const autoplay = Autoplay({
    delay: 4000,
    stopOnInteraction: false
});

export default function Reviews() {
    return (
        <div className="w-full relative z-10">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-playfair text-3xl font-bold sm:text-4xl lg:text-5xl text-center mb-4"
            >
                Client <span className="font-light">Reviews</span>
            </motion.h1>

            <div className="flex flex-col items-center w-full">
                <Carousel className="w-full max-w-5xl" opts={{
                    align: "center",
                    loop: true,
                }}
                    plugins={[autoplay]}>
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {reviews.map((review, index) => (
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
                                                    <p className="text-sm text-muted-foreground">{review.date}</p>
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
    )
} 