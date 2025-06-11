import Footer from "@/components/Footer";
import SessionProvider from "@/components/SessionProvider";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation";


export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return redirect('/auth')
    }

    return (
        <SessionProvider session={session} >
            {children}
            <Footer />
        </SessionProvider >
    )
}