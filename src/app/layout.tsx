import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    "A simple way to get anonymous feedback on your project, resume, portfolio and more.",
};

export default function RootLayout({ children }: ReactChildren) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="w-full max-w-screen-sm mx-auto min-h-screen px-5 responsive">
          {children}
        </main>
      </body>
    </html>
  );
}
