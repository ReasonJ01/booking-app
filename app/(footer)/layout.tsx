import Footer from "@/components/Footer";

export default function FooterLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
            <Footer />
        </div>
    )
}