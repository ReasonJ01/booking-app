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

const images = ["/cara1.png", "/cara2.png", "/cara1.png", "/cara2.png", "/cara1.png", "/cara1.png", "/cara2.png"]

const autoplay = Autoplay({
    delay: 2000,
    stopOnInteraction: false
});

export default function WorkCarousel() {
    return (
        <div className="w-full relative z-10">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-playfair text-3xl font-bold sm:text-4xl lg:text-5xl text-center mb-4"
            >
                Some Of My <span className="font-light">Favourite Work</span>
            </motion.h1>

            <div className="flex flex-col items-center w-full">
                <Carousel className="w-full max-w-5xl" opts={{
                    align: "center",
                    loop: true,
                }}
                    plugins={[autoplay]}>
                    <CarouselContent>
                        {images.map((image, index) => (
                            <CarouselItem key={index} className="basis-3/4 md:basis-3/5 lg:basis-1/2 w-full h-full">
                                <div>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card className="border-2 border-primary/30 bg-background/50 backdrop-blur-sm shadow-lg hover:border-primary/50 transition-colors duration-300 p-0 rounded-md w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]">
                                            <CardContent className="p-0 flex justify-center items-center h-full w-full">
                                                <div className="w-full h-full relative">
                                                    <Image
                                                        src={image}
                                                        alt="Nail image"
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 640px) 300px, (max-width: 768px) 400px, 500px"
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
    )
} 