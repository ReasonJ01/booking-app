import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="mt-2 text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist.</p>
            <Link
                href="/"
                className="mt-6 rounded bg-primary px-4 py-2 text-primary-foreground shadow"
            >
                Go Home
            </Link>
        </div>
    )
}
