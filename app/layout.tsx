import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GSAPProvider from "@/components/providers/GSAPProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/nav/Navbar";
import Preloader from "@/components/ui/Preloader";
import Footer from "@/components/sections/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "North-Brook Ltd | Precision in Oil & Gas Operations",
  description: "Established in 2014, North-Brook Limited is a leading Ghanaian company specializing in total onshore and offshore logistics solutions including Air/Sea Freight, Bunkering, and Ship Agency.",
  keywords: ["Logistics", "Ghana", "Oil and Gas", "Freight Forwarding", "Ship Agency", "West Africa"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
    >
      <body className="bg-background text-foreground selection:bg-accent selection:text-white">
        <Preloader />
        <GSAPProvider>
          <Navbar />
          <ScrollProgress />
          <CustomCursor />
          <main>{children}</main>
          <Footer />
        </GSAPProvider>
      </body>
    </html>
  );
}
