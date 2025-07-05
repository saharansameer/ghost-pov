import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/server";
import { auth, Session } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { ThemeProvider } from "@/context/theme-provider";
import { ReactChildren } from "@/types";
import { PageTransition } from "@/components/Motion/PageTransition";
import SonnerToaster from "@/components/Sonner/SonnerToaster";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-theme ease-initial duration-200 animate-collapsible-up`}
      >
        <ThemeProvider>
          <Header session={session as Session} />

          <PageTransition>
            <main className="layout-container min-h-screen">
              {children}
              <SonnerToaster />
            </main>
          </PageTransition>
          
          <footer className="layout-container">
            <Footer />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
