'use client'
import { usePathname } from "next/navigation";
import { Home, Calendar, User } from 'lucide-react'
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { motion } from "framer-motion";

const navItems = [
    { href: '/dashboard', icon: <Home className="h-5 w-5" />, label: 'Home' },
    { href: '/book', icon: <Calendar className="h-5 w-5" />, label: 'Book' },
    { href: '/account', icon: <User className="h-5 w-5" />, label: 'Account' },
]

export default function MobileNavBar() {
    const pathname = usePathname()

    // Find the index of the active nav item
    const activeIndex = navItems.findIndex(item => pathname.startsWith(item.href.split('?')[0]))

    return (
        <nav className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-x-3 rounded-full border bg-background p-1 shadow-lg sm:hidden">
            {/* Background indicator that slides */}
            {activeIndex !== -1 && (
                <motion.div
                    className="absolute h-12 w-16 rounded-full bg-secondary"
                    animate={{ x: activeIndex * (64 + 12) }} // 64px (w-16) + 12px (gap-x-3)
                    transition={{
                        duration: 0.15,
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                    }}
                />
            )}
            {navItems.map(({ href, icon, label }) => {
                const isActive = pathname.startsWith(href.split('?')[0])
                return (
                    <Link
                        prefetch={true}
                        key={href}
                        href={href}
                        className="flex flex-col items-center justify-center text-xs w-16 h-12 rounded-full relative z-10"
                    >
                        <motion.div
                            animate={{
                                color: isActive ? "hsl(var(--secondary-foreground))" : "hsl(var(--muted-foreground))"
                            }}
                            className="flex flex-col items-center"
                        >
                            {icon}
                            <span>{label}</span>
                        </motion.div>
                    </Link>
                )
            })}
            <ThemeToggle />
        </nav>
    )
}