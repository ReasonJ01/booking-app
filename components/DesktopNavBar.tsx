// components/DesktopNavBar.tsx
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOutIcon, UserCircle } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const navItems = [
    { href: '/book', label: 'Book' },
    { href: '/dashboard', label: 'Dashboard' },
]

export default function DesktopNavBar() {
    const pathname = usePathname()
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const session = await authClient.getSession()
                if (session.data?.user?.name) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                }
            } catch {
                setIsAuthenticated(false)
            } finally {
                setIsLoading(false)
            }
        }
        fetchUser()
    }, [])

    const handleSignOut = async () => {
        await authClient.signOut()
        setIsAuthenticated(false)
        router.push('/auth')
        router.refresh()
    }

    if (isLoading) {
        return (
            <header className="h-16 sticky top-0 z-50 hidden sm:flex w-full items-center justify-between border-b bg-background px-4 shadow-sm">
                <Link href="/" className="text-lg font-semibold">
                    <Image src="/logo.svg" alt="Refined by Jessica" width={100} height={56} className="h-12 w-auto object-contain" />
                </Link>
                <nav className="flex gap-2 items-center">
                    <ThemeToggle />
                </nav>
            </header>
        )
    }

    return (
        <header className="h-16 sticky top-0 z-50 hidden sm:flex w-full items-center justify-between border-b bg-background px-4 shadow-sm">
            <Link href="/" className="text-lg font-semibold">
                <Image src="/logo.svg" alt="Refined by Jessica" width={100} height={56} className="h-12 w-auto object-contain" />
            </Link>

            <nav className="flex gap-2 items-center">
                {isAuthenticated ? (
                    <>
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
                        <div className="flex items-center gap-2 ml-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost">
                                        <UserCircle className="h-5 w-5" />
                                        Account
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link href="/account">My Account</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleSignOut}>
                                        <LogOutIcon className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <ThemeToggle />
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-2">
                        <Button asChild variant="default">
                            <Link href="/auth/">Sign In</Link>
                        </Button>
                        <ThemeToggle />
                    </div>
                )}
            </nav>
        </header>
    )
}
