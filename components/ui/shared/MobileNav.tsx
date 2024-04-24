"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import Image from "next/image";
import NavItems from "./NavItems";
import { useState } from "react";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeSheet = () => {
    setIsOpen(false);
  };
  return (
    <nav className="md:hidden">
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <SheetTrigger className="align-middle">
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white border-none md:hidden">
          <Image
            src="/assets/images/loogo.svg"
            alt="logo"
            width={120}
            height={38}
          />
          <Separator className="border border-primary-100  " />
          <SheetClose asChild>
            <NavItems closeSheet={closeSheet} />
          </SheetClose>
        </SheetContent>
      </Sheet>
    </nav>
  );
};
export default MobileNav;
