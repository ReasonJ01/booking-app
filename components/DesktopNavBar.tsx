// components/DesktopNavBar.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'
import { UserDropdown } from './nav/UserDropdown'

export default function DesktopNavBar() {
    const router = useRouter()
    const pathname = usePathname()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

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

    return (
        <header className="h-16 sticky top-0 z-50 hidden sm:flex w-full items-center justify-between border-b bg-background px-4 shadow-sm">
            <Link href="/" className="text-lg font-semibold">
                <Image src="/logo.svg" alt="Refined by Jessica" width={100} height={56} className="h-12 w-auto object-contain" priority />
            </Link>

            <nav className="flex items-center gap-4">
                <Button
                    asChild
                    variant={pathname.startsWith('/book') ? 'default' : 'ghost'}
                    className="text-sm active:scale-95 transition-transform"
                >
                    <Link href="/book">Book</Link>
                </Button>

                {isAuthenticated ? (
                    <>
                        <Button
                            asChild
                            variant={pathname.startsWith('/dashboard') ? 'default' : 'ghost'}
                            className="text-sm active:scale-95 transition-transform"
                        >
                            <Link href="/dashboard">Home</Link>
                        </Button>
                        <div className="flex items-center gap-2 ml-2">
                            <UserDropdown onSignOut={handleSignOut} />
                        </div>
                    </>
                ) : (
                    <Button
                        asChild
                        variant="default"
                        className="active:scale-95 transition-transform"
                    >
                        <Link href="/auth">Sign In</Link>
                    </Button>
                )}

                <ThemeToggle />
            </nav>
        </header>
    )
}
