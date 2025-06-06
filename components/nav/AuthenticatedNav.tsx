import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '../ThemeToggle'
import { UserDropdown } from './UserDropdown'

const navItems = [
    { href: '/book', label: 'Book' },
    { href: '/dashboard', label: 'Dashboard' },
]

interface AuthenticatedNavProps {
    onSignOut: () => Promise<void>
}

export function AuthenticatedNav({ onSignOut }: AuthenticatedNavProps) {
    const pathname = usePathname()

    return (
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
                <UserDropdown onSignOut={onSignOut} />
                <ThemeToggle />
            </div>
        </>
    )
} 