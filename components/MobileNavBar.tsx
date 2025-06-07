'use client'
import { usePathname } from "next/navigation";
import { Home, Calendar, User } from 'lucide-react'
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";


const navItems = [
    { href: '/dashboard', icon: <Home className="h-5 w-5" />, label: 'Home' },
    { href: '/book', icon: <Calendar className="h-5 w-5" />, label: 'Book' },
    { href: '/account', icon: <User className="h-5 w-5" />, label: 'Account' },
]

export default function MobileNavBar() {
    const pathname = usePathname()
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t bg-background py-2 shadow-md sm:hidden">
            {navItems.map(({ href, icon, label }) => {
                const isActive = pathname.startsWith(href.split('?')[0])
                return (
                    <Link
                        key={href}
                        href={href}
                        className={`flex flex-col items-center justify-center text-xs w-16 h-12 rounded-lg ${isActive ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground'}`}
                    >
                        {icon}
                        <span>{label}</span>
                    </Link>
                )
            })}
            <ThemeToggle />
        </nav>
    )
}