import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import Image from "next/image";
import NavItems from "./NavItems";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="menu logo"
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className="bg-white">
          <Image
            src="/assets/images/logo.svg"
            alt="menu logo"
            width={128}
            height={40}
            className="pb-3"
          />
          <Separator className="border-b border-grey-50 " />
          <NavItems/>
        </SheetContent>
      </Sheet>
    </nav>
  );
};
export default MobileNav;
