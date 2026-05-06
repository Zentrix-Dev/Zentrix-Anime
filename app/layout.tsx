// app/layout.tsx

import type { Metadata } from "next";
import { Rajdhani, DM_Sans, Bebas_Neue, Noto_Sans_JP } from "next/font/google";
import { CookieConsent } from "@/components/ui/CookieConsent";
import "./globals.css";

// Configure Google Fonts
const rajdhani = Rajdhani({ 
  subsets: ["latin"], 
  weight: ["500", "600", "700"],
  variable: '--font-rajdhani'
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans'
});

const bebasNeue = Bebas_Neue({ 
  subsets: ["latin"], 
  weight: ["400"],
  variable: '--font-bebas-neue'
});

const notoSansJP = Noto_Sans_JP({ 
  subsets: ["latin"], // Includes Japanese characters automatically
  variable: '--font-noto-sans-jp'
});

export const metadata: Metadata = {
  title: "ZentrixAnime — Neo Tokyo Streaming",
  description: "A premium, dark-themed anime streaming platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rajdhani.variable} ${dmSans.variable} ${bebasNeue.variable} ${notoSansJP.variable} font-body text-text-primary bg-primary antialiased relative min-h-screen`}>
        {/* Animated Background Layers */}
        <div className="global-bg" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        
        {/* Main Application */}
        <main className="relative z-10 flex flex-col min-h-screen">
          {children}
        </main>

        {/* Global UI Overlays */}
        <CookieConsent />
      </body>
    </html>
  );
}
