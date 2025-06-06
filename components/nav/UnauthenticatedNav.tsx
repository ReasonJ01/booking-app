import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '../ThemeToggle'

export function UnauthenticatedNav() {
    return (
        <div className="flex items-center gap-2">
            <Button asChild variant="default">
                <Link href="/auth/">Sign In</Link>
            </Button>
            <ThemeToggle />
        </div>
    )
} 