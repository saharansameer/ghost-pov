import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/server";
import { ThemeProvider } from "@/context/theme-provider";
import { ReactChildren } from "@/types";
import { PageTransition } from "@/components/Motion/PageTransition";
import SonnerToaster from "@/components/Sonner/SonnerToaster";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GhostPOV",
  description: "The Simplest Way to Get Anonymous Feedback",
  metadataBase: new URL("https://ghostpov.xyz"),
  alternates: {
    canonical: "https://ghostpov.xyz",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "GhostPOV",
    description: "The Simplest Way to Get Anonymous Feedback",
    url: "https://ghostpov.xyz",
    siteName: "GhostPOV",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "GhostPOV - The Simplest Way to Get Anonymous Feedback",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GhostPOV - The Simplest Way to Get Anonymous Feedback",
    description:
      "The Simplest Way to Get Anonymous Feedback",
    images: ["/og.png"],
    creator: "@sameersaharanx",
  },
  keywords: [
    "anonymous feedback",
    "resume feedback",
    "portfolio review",
    "project feedback",
    "get feedback",
    "GhostPOV",
    "ghost-pov",
    "ghostpov",
    "sameer saharan",
  ],
  authors: [{ name: "Sameer Saharan", url: "https://sameersaharan.com" }],
  creator: "Sameer Saharan",
  publisher: "Sameer Saharan",
  category: "technology",
  robots: {
    index: true,
    follow: true,
  },
};

async function HeaderWithAuth() {
  const session = await auth.api.getSession({ headers: await headers() });
  const authenticated = session !== null;
  return <Header authenticated={authenticated} />;
}

export default function RootLayout({ children }: ReactChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSans.variable} antialiased transition-theme ease-initial duration-200 animate-accordion-down`}
      >
        <ThemeProvider>
          <HeaderWithAuth />

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
        <Analytics />
      </body>
    </html>
  );
}
