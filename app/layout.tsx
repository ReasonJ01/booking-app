import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import MobileNavBar from "@/components/MobileNavBar";
import DesktopNavBar from "@/components/DesktopNavBar";
import SessionProvider from "@/components/SessionProvider";
import { authClient } from "@/lib/auth-client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Refined by Jessica",
  description: "The home of Refined by Jessica",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result = await authClient.getSession();
  const session = result.data?.session ?? null;

  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased min-h-full flex flex-col`}
      >
        <SessionProvider session={session}>
          <header>
            <DesktopNavBar />
          </header>

          <main className="flex-1">
            {children}
          </main>
          <MobileNavBar />
        </SessionProvider>
      </body>
    </html>
  );
}
