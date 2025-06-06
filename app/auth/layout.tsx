export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-[calc(100vh-4rem)] grid place-items-center px-4 py-2 sm:p-4">
            <main className="w-full max-w-md">
                {children}
            </main>
        </div>
    )
} 