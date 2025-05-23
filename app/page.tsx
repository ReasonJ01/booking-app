'use client'
import Image from "next/image";
import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { ClockIcon, Mail, MapPin, MessageSquare } from "lucide-react";
import { SiInstagram, SiFacebook, SiTiktok } from "@icons-pack/react-simple-icons";
import Footer from "@/components/Footer";


const images = ["/cara1.png", "/cara2.png", "/cara1.png", "/cara2.png", "/cara1.png"]
const socials = [
  {
    name: 'Instagram',
    icon: SiInstagram,
    handle: '@refinedbyjessica',
    url: 'https://instagram.com/refinedbyjessica',
  },
  {
    name: 'Facebook',
    icon: SiFacebook,
    handle: '/refinedbyjessica',
    url: 'https://facebook.com/refinedbyjessica',
  },
  {
    name: 'Tiktok',
    icon: SiTiktok,
    handle: 'RefinedByJessica',
    url: '#',
  },
  {
    name: 'Email',
    icon: Mail,
    handle: 'refinedbyjessica@gmail.com',
    url: 'mailto:refinedbyjessica@gmail.com',
  },
]
const autoplay = Autoplay({
  delay: 2000,
  stopOnInteraction: false
})

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <div className="h-[calc(100vh-3rem)] sm:h-[calc(100vh-4rem)] w-full overflow-y-scroll snap-y snap-mandatory">
      <section className="w-full min-h-[calc(100vh-3rem)] snap-start snap-always bg-gradient-to-b from-background to-secondary text-foreground flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="flex-1 flex items-center justify-center w-full relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255, 8, 8, 0.71),transparent_50%)]" />
          <Image
            src="/logo.png"
            alt="Logo"
            width={400}
            height={400}
            className="relative z-10 drop-shadow-xl hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex flex-col items-center justify-start"
        >
          <h1 className="font-playfair text-3xl font-bold sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Flawless Nails.
            <span className="block mt-2 font-light leading-tight text-2xl sm:text-3xl lg:text-4xl">
              <span className="inline-block mb-1">Handcrafted.</span>
              <span className="inline-block mx-1 ">Hypoallergenic.</span>
              <span className="inline-block mt-1 leading-[1.2] mb-2">Highly You.</span>
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-muted-foreground text-base font-light tracking-wide leading-relaxed">
            From delicate minimalism to bold statement sets, every look is <span className="font-semibold text-primary transition-colors duration-300 hover:text-primary/80">Refined</span>.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/book"
            className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 text-base font-medium tracking-wide text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            Book Now
          </motion.a>
        </motion.div>
      </section>

      <section className="w-full min-h-[calc(100vh-3rem)] snap-start snap-always bg-gradient-to-b from-secondary to-background text-foreground flex flex-col items-center justify-start text-center pt-6 pb-16 sm:pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.05),transparent_50%)]" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-playfair text-3xl font-bold sm:text-4xl lg:text-5xl relative z-10 mb-4"
        >
          Some Of My <span className="font-light">Favourite Work</span>
        </motion.h1>

        <div className="flex flex-col items-center w-full relative z-10">
          <Carousel className="pt-4 w-full" opts={{
            align: "center",
            loop: true,
          }}
            plugins={[autoplay]}>
            <CarouselContent className="-ml-4">
              {images.map((path, i) => (
                <CarouselItem key={i} className="w-full basis-3/4 lg:basis-1/4 pl-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden rounded-xl p-0 border-none">
                      <CardContent className="relative aspect-square p-0 shadow-xl">
                        <Image
                          src={path}
                          alt="Nail image"
                          fill
                          className="object-cover hover:brightness-110 transition-all duration-300"
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-background/95 backdrop-blur-sm border border-ring/20 rounded-xl p-6 mt-6 mx-4 shadow-lg md:max-w-md"
          >
            <p className="text-sm leading-relaxed tracking-wide font-light">
              With years of experience in nail artistry, I specialize in creating stunning, long-lasting designs that reflect your unique style. From classic elegance to bold statement pieces, every set is crafted with precision and care.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="find-me" className="w-full min-h-[calc(100vh-4rem)] snap-start snap-always bg-gradient-to-b from-background to-secondary text-foreground flex flex-col items-center justify-start text-center pt-4 pb-28 sm:pb-8 relative overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-playfair text-3xl font-bold sm:text-4xl lg:text-5xl mb-4 relative z-10"
        >
          Where To <span className="font-light">Find Me</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-background/95 backdrop-blur-md py-4 px-6 rounded-xl shadow-lg max-w-sm sm:max-w-md w-full relative z-10 border border-ring/20  transition-colors"
        >
          <div className="space-y-6">
            {/* Location Section */}
            <div>
              <h2 className="font-playfair text-lg font-medium flex items-center justify-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                Lieto Beauty
              </h2>
              <a
                href="https://maps.google.com/?q=Lieto+Beauty+Leeds"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm tracking-wide hover:text-primary underline transition-colors group"
              >
                <address className="not-italic leading-relaxed group-hover:text-primary transition-colors">
                  203 Richardshaw Lane<br />
                  Stanningley, Leeds<br />
                  LS28 6AA
                </address>
              </a>
            </div>

            {/* Opening Hours Section */}
            <div>
              <h2 className="font-playfair text-lg font-medium flex justify-center items-center gap-2 mb-2">
                <ClockIcon className="w-5 h-5 text-primary" />
                Opening Hours
              </h2>
              <div className="flex justify-center">
                <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-1 text-sm tracking-wide">
                  {[
                    ["Mon", "10:00 – 18:00"],
                    ["Tue", "10:00 – 18:00"],
                    ["Wed", "10:00 – 18:00"],
                    ["Thu", "10:00 – 18:00"],
                    ["Fri", "10:00 – 18:00"],
                    ["Sat", "10:00 – 16:00"],
                    ["Sun", "Closed"],
                  ].map(([day, hours]) => (
                    <motion.div
                      key={day}
                      whileHover={{ x: 5 }}
                      className="contents"
                    >
                      <dt className="font-medium text-right">{day}</dt>
                      <dd className="font-light">{hours}</dd>
                    </motion.div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Contact Section */}
            <div>
              <h2 className="font-playfair text-lg font-medium flex justify-center items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Contact Me
              </h2>
              <ul className="flex flex-col items-center gap-2">
                {socials.map(({ name, icon: Icon, handle, url }) => (
                  <motion.li
                    key={name}
                    whileHover={{ x: 5 }}
                  >
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm tracking-wide hover:text-primary underline transition-colors"
                    >
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="font-light">{handle}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="w-full snap-end snap-always bg-gradient-to-b from-secondary via-secondary to-secondary pb-16 sm:pb-0">
        <Footer />
      </section>
    </div>
  );
}
