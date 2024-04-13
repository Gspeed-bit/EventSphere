import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "EventSphere",
  description: "EventSphere is a platform for event management.",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}){
  return ( 
    <ClerkProvider>
      <html lang="en">
        <body className={quicksand.variable}>{children}</body>
      </html>
    </ClerkProvider>
 
  )
}
