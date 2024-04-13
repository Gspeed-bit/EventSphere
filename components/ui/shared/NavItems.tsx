"use client"
import { headerLinks } from "@/constant"; // Assuming headerLinks is correctly imported
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
const pathname = usePathname();

return (
  <div>
      <ul className=" w-full md:flex-between md:flex-row md:space-y-0 gap-4 flex-row pt-3 space-y-5">
        {headerLinks.map((link) => {
          const { route, label } = link;
          const isActive = pathname === route ;
          return (
            <li key={label}>
              <Link
                href={route}
                className={`${isActive && "text-primary-500"} flex-center p-medium-16 whitespace-nowrap`
                 
                }
              >
                {label}
              </Link>{" "}
              {/* Changed ref to href for route */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavItems;
