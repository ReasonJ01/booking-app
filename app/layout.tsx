import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import MobileNavBar from "@/components/MobileNavBar";
import DesktopNavBar from "@/components/DesktopNavBar";
import QueryProvider from "@/components/QueryProvider";

// Theme script that runs before page render
const themeScript = `
  let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const stored = localStorage.getItem('theme')
  
  if (stored === 'dark' || (!stored && isDark)) {
    document.documentElement.classList.add('dark')
  }
  
  if (stored === 'light') {
    document.documentElement.classList.remove('dark')
  }
`

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
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased min-h-full flex flex-col`}
      >
        <QueryProvider>
          <DesktopNavBar />

          <main className="flex-1 pt-0 sm:pt-20">
            {children}

          </main>
          <MobileNavBar />
        </QueryProvider>
      </body>
    </html>
  );
}
