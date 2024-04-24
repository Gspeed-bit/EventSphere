
"use client"
// this was created because we dont want the header and footer in all the pages so we created this layout seperately

import Footer from "@/components/ui/shared/Footer";
import Header from "@/components/ui/shared/Header";
import { useState } from "react";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeSheet = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header closeSheet={closeSheet} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
