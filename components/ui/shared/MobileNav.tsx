import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import Image from "next/image";
import NavItems from "./NavItems";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
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
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};
export default MobileNav;
