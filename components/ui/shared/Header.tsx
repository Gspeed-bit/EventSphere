import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../button"; 
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
const Header = () => {
  return (
    <div className="border-b w-full">
      {/* Border bottom for styling */}
      <div className="wrapper flex-between">
        {/* Wrapper for flex layout */}
        {/* Link to home page with logo */}
        <Link href="/" className="">
          <Image
            src="/assets/images/logo.svg" // Logo image source
            width={130} // Logo image width
            height={30} // Logo image height
            alt="logo" // Alt text for logo
          />
        </Link>
        <SignedIn>
         <nav className="md:flex-between hidden w-full max-w-xs">
          <NavItems/>
         </nav>
        </SignedIn>

        <div className="flex gap-3 ">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />{" "}
            <MobileNav/>
            {/* UserButton with sign-out URL */}
          </SignedIn>
          {/* Display custom Button component when signed out */}
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              {" "}
              {/* Custom Button for login */}
              {/* Link to sign-in page */}
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Header; // Export Header component
