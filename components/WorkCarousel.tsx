'use client'

import { motion } from "framer-motion";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { image } from "@/lib/schema";

type Image = typeof image.$inferSelect;

const autoplay = Autoplay({
    delay: 2000,
    stopOnInteraction: false
});

export default function WorkCarousel() {
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        fetch("/api/images").then(res => res.json()).then(images => {
            if (images.length < 5) {
                while (images.length < 5) {
                    images.push(...images)
                }
            }
            setImages(images)
        })
    }, [])
    return (
        <div className="w-full relative z-10">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="font-playfair text-3xl font-bold sm:text-4xl lg:text-5xl text-center mb-4"
            >
                Some Of My <span className="font-light">Favourite Work</span>
            </motion.h1>

            <div className="flex flex-col items-center w-full">
                <div className="w-full max-w-5xl relative">
                    {/* Left opacity gradient overlay for large screens */}
                    <div className="hidden lg:block absolute left-0 top-0 h-full w-30 z-20 pointer-events-none bg-gradient-to-r from-background via-background/80 to-transparent" />
                    {/* Right opacity gradient overlay for large screens */}
                    <div className="hidden lg:block absolute right-0 top-0 h-full w-30 z-20 pointer-events-none bg-gradient-to-l from-background via-background/80 to-transparent" />

                    <Carousel className="w-full" opts={{
                        align: "center",
                        loop: true,
                    }}
                        plugins={[autoplay]}>
                        <CarouselContent className="-ml-6">
                            {images.map((image, index) => (
                                <CarouselItem key={index} className="basis-3/4w-full h-full pl-6">
                                    <div>
                                        <motion.div>
                                            <Card className="border-2 border-primary/30 bg-background/50 backdrop-blur-sm shadow-lg hover:border-primary/50 transition-colors duration-300 p-0 rounded-lg w-[250px] h-[250px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] overflow-hidden">
                                                <CardContent className="p-0 flex justify-center items-center h-full w-full">
                                                    <div className="w-full h-full relative">
                                                        <Image
                                                            src={image.url}
                                                            alt="Nail image"
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, 300px"
                                                        />
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