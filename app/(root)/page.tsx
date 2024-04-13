import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" bg-dotted-pattern bg-grey-50 px-5 py-5 ">
      <section className="wrapper grid grid-cols-1 md:grid-cols-2">
        <div className="flex-start space-y-7 md:space-y-9">
          <h1 className="h2-bold md:h1-bold">
            Empowering Moments: Uniting Communities, One Event at a Time!
          </h1>
          <p className="p-regular-18 md:p-regular-20">
            Discover invaluable insights and guidance from over 1020 mentors
            across renowned companies, all within our vibrant global community.
          </p>
          <Button size="lg" asChild className="button w-full sm:w-fit">
            <Link href="#events">Explore Now </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
