// components/DesktopNavBar.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { AuthenticatedNav } from './nav/AuthenticatedNav'
import { UnauthenticatedNav } from './nav/UnauthenticatedNav'

// Separate loading state component for better performance
const LoadingNavBar = () => (
    <header className="h-16 sticky top-0 z-50 hidden sm:flex w-full items-center justify-between border-b bg-background px-4 shadow-sm">
        <Link href="/" className="text-lg font-semibold">
            <Image src="/logo.svg" alt="Refined by Jessica" width={100} height={56} className="h-12 w-auto object-contain" priority />
        </Link>
    </header>
)

export default function DesktopNavBar() {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let mounted = true

        const checkAuth = async () => {
            try {
                const session = await authClient.getSession()
                if (mounted) {
                    setIsAuthenticated(!!session.data?.user?.name)
                    setIsLoading(false)
                }
            } catch {
                if (mounted) {
                    setIsAuthenticated(false)
                    setIsLoading(false)
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

    if (isLoading) return <LoadingNavBar />

    return (
        <header className="h-16 sticky top-0 z-50 hidden sm:flex w-full items-center justify-between border-b bg-background px-4 shadow-sm">
            <Link href="/" className="text-lg font-semibold">
                <Image src="/logo.svg" alt="Refined by Jessica" width={100} height={56} className="h-12 w-auto object-contain" priority />
            </Link>

            <nav className="flex gap-2 items-center">
                {isAuthenticated ? (
                    <AuthenticatedNav onSignOut={handleSignOut} />
                ) : (
                    <UnauthenticatedNav />
                )}
            </nav>
        </header>
    )
}
