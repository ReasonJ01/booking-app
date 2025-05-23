export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="mt-2 text-muted-foreground">The page you're looking for doesn't exist.</p>
            <a
                href="/"
                className="mt-6 rounded bg-primary px-4 py-2 text-primary-foreground shadow"
            >
                Go Home
            </a>
        </div>
    )
}
