//layout of the landing page
import type { Metadata } from "next";
import {Outfit} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";


const outfit = Outfit({subsets:['latin']});

export const metadata: Metadata = {
  title: "Gui Teacher",
  description: "Gui Teacher is an AI platform for speaking students. This AI speaking coach will help you to improve your english skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
