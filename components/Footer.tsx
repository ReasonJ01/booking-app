'use client'

import Link from 'next/link'
import { Mail } from 'lucide-react'
import { SiInstagram, SiFacebook, SiTiktok } from "@icons-pack/react-simple-icons"

const footerLinks = [
    {
        title: 'Policies',
        links: [
            { name: 'Policies', href: '/policies' },
        ]
    },
    {
        title: 'Services',
        links: [
            { name: 'Book Now', href: '/book' },
            { name: 'Price List', href: '/price-list' },
            { name: 'Aftercare Guide', href: '/aftercare' },

        ]
    },
    {
        title: 'Information',
        links: [
            {
                name: 'Location & Hours',
                href: '/#find-me',

            },
            { name: 'FAQs', href: '/#faq' },
            { name: 'Welcome Page', href: '/' },
        ]
    }
]

const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/refinedbyjessica', icon: SiInstagram, handle: '@refinedbyjessica' },
    { name: 'Facebook', href: 'https://facebook.com/refinedbyjessica', icon: SiFacebook, handle: '/refinedbyjessica' },
    { name: 'Tiktok', href: '#', icon: SiTiktok, handle: 'RefinedByJessica' },
    { name: 'Email', href: 'mailto:refinedbyjessica@gmail.com', icon: Mail, handle: 'refinedbyjessica@gmail.com' },
]

export default function Footer() {
    return (
        <footer className="bg-transparent text-foreground py-8 px-4 sm:px-6 pb-24">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="font-playfair text-lg font-medium mb-3">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary active:text-primary/80 active:underline active:scale-95 transition-all duration-200 ease-in-out inline-block"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-8 border-t border-primary flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary active:text-primary/80 active:underline active:scale-95 transition-all duration-200 ease-in-out flex items-center gap-2 group"
                                aria-label={social.name}
                            >
                                <social.icon className="h-5 w-5" />
                                <span className="text-sm font-light hidden sm:inline-block group-hover:text-primary transition-colors">{social.handle}</span>
                            </a>
                        ))}
                    </div>

                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Refined by Jessica. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
} 