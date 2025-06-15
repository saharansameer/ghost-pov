import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/server";
import { auth, Session } from "@/lib/auth";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GhostPOV",
  description:
    "The simplest way to get anonymous feedback on your project, resume, portfolio and more.",
};

export default async function RootLayout({ children }: ReactChildren) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="layout-container">
          <Header session={session as Session} />
        </header>

        <main className="layout-container max-w-screen-sm min-h-screen px-2">
          {children}
        </main>
        
        <footer className="layout-container">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
