import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FIFA World Cup 2026™ | Official Portal",
  description: "Official ticketing and operations portal for the FIFA World Cup 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-fifa-navy text-fifa-text antialiased min-h-screen selection:bg-fifa-gold selection:text-fifa-navy`}>
        <Navbar />
        {/* Padding added to account for the fixed Navbar */}
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}