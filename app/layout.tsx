import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { auth } from "@/auth";
import SessionProvider from "@/components/SessionProvider";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata: Metadata = {
  title: "Planzee | Your Trip Planner",
  description: "Plan, explore, and organize your travel with ease.",
};

// Root Layout Component
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <div className="min-h-screen bg-gray-900 text-white">
            <NavBar />
            <main className="container mx-auto px-3 py-6">
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
