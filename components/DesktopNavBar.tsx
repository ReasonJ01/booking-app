// components/DesktopNavBar.tsx
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import Image from 'next/image'

const navItems = [
    { href: '/book', label: 'Book' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/account', label: 'Account' },
]

export default function DesktopNavBar() {
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 hidden sm:flex w-full items-center justify-between border-b bg-background px-4 py-2 shadow-sm">
            <Link href="/" className="text-lg font-semibold">
                <Image src="/logo.png" alt="Refined by Jessica" width={100} height={64} />
            </Link>

            <nav className="flex gap-2">
                {navItems.map(({ href, label }) => {
                    const isActive = pathname.startsWith(href)
                    return (
                        <Button
                            key={href}
                            asChild
                            variant={isActive ? 'default' : 'ghost'}
                            className="text-sm"
                        >
                            <Link href={href}>{label}</Link>
                        </Button>
                    )
                })}
                <ThemeToggle />
            </nav>
        </header>
    )
}
