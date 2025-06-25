// components/DesktopNavBar.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCallback, useEffect, useState, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { ThemeToggle } from './ThemeToggle'
import { UserDropdown } from './nav/UserDropdown'
import { motion } from 'framer-motion'
import { Home, Calendar } from 'lucide-react'

export default function DesktopNavBar() {
    const router = useRouter()
    const pathname = usePathname()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [activeElement, setActiveElement] = useState<HTMLElement | null>(null)
    const navRefs = useRef<(HTMLElement | null)[]>([])

    useEffect(() => {
        let mounted = true

        const checkAuth = async () => {
            try {
                const session = await authClient.getSession()
                if (mounted) {
                    setIsAuthenticated(!!session.data?.user?.name)
                }
            } catch {
                if (mounted) {
                    setIsAuthenticated(false)
                }
            }
        }

        checkAuth()
        return () => { mounted = false }
    }, [])

    const handleSignOut = useCallback(async () => {
        await authClient.signOut()
        setIsAuthenticated(false)
        router.replace('/auth')
    }, [router])

    // Define navigation items for consistent structure
    const navItems = [
        { href: '/book', icon: <Calendar className="h-4 w-4" />, label: 'Book' },
        ...(isAuthenticated ? [{ href: '/dashboard', icon: <Home className="h-4 w-4" />, label: 'Home' }] : []),
    ]

    // Find the index of the active nav item
    const activeIndex = navItems.findIndex(item => pathname.startsWith(item.href))

    // Check if account page is active (for UserDropdown highlighting)
    const isAccountActive = pathname.startsWith('/account')

    // Update active element when activeIndex changes
    useEffect(() => {
        if (activeIndex !== -1 && navRefs.current[activeIndex]) {
            setActiveElement(navRefs.current[activeIndex])
        } else if (isAccountActive && isAuthenticated) {
            // If on account page, highlight the UserDropdown
            const userDropdownElement = document.querySelector('[data-user-dropdown]') as HTMLElement
            if (userDropdownElement) {
                setActiveElement(userDropdownElement)
            }
        } else {
            setActiveElement(null)
        }
    }, [activeIndex, pathname, isAccountActive, isAuthenticated])

    return (
        <header className="fixed top-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-x-3 rounded-full border bg-background p-1 shadow-lg sm:flex hidden">
            {/* Background indicator that follows the active element */}
            {activeElement && (
                <motion.div
                    className="absolute h-12 rounded-full bg-secondary top-1"
                    style={{
                        width: activeElement.offsetWidth
                    }}
                    animate={{ x: activeElement.offsetLeft - 4 }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                    }}
                />
            )}

            {/* Logo */}
            <Link href="/" className="relative z-10 flex items-center px-3">
                <Image src="/logo.svg" alt="Refined by Jessica" width={80} height={40} className="h-8 w-auto object-contain" priority />
            </Link>

            {/* Navigation items */}
            {navItems.map(({ href, icon, label }, index) => {
                const isActive = pathname.startsWith(href)
                return (
                    <Link
                        ref={(el) => { navRefs.current[index] = el }}
                        prefetch={true}
                        key={href}
                        href={href}
                        className="flex items-center justify-center gap-2 text-sm w-20 h-12 rounded-full relative z-10"
                    >
                        <motion.div
                            animate={{
                                color: isActive ? "hsl(var(--secondary-foreground))" : "hsl(var(--muted-foreground))"
                            }}
                            className="flex items-center gap-2"
                        >
                            {icon}
                            <span className="font-medium">{label}</span>
                        </motion.div>
                    </Link>
                )
            })}

            {/* Auth section */}
            {isAuthenticated ? (
                <div
                    data-user-dropdown
                    className="relative z-10 flex items-center px-3"
                >
                    <UserDropdown onSignOut={handleSignOut} />
                </div>
            ) : (
                <Link
                    prefetch={true}
                    href="/auth"
                    className="flex items-center justify-center text-sm w-20 h-12 rounded-full relative z-10"
                >
                    <motion.div
                        animate={{
                            color: pathname.startsWith('/auth') ? "hsl(var(--secondary-foreground))" : "hsl(var(--muted-foreground))"
                        }}
                        className="font-medium"
                    >
                        Sign In
                    </motion.div>
                </Link>
            )}

            {/* Theme toggle */}
            <div className="relative z-10 flex items-center px-3">
                <ThemeToggle />
            </div>
        </header>
    )
}
