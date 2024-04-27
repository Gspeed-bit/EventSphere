import { Button } from "@/components/ui/button";
import CategoryFilter from "@/components/ui/shared/CategoryFilter";
import Collection from "@/components/ui/shared/Collection";
import Search from "@/components/ui/shared/Search";
import { getAllEvents } from "@/lib/actions/event.actions";


import Image from "next/image";
import Link from "next/link";

export default async function Home() {
const events = await getAllEvents({
  query:"",
  category:"",
  page:1,
  limit:8
})
console.log(events)

  return (
    <>
      <div className=" bg-dotted-pattern bg-primary-50 px-5 py-5 ">
        <section className="wrapper grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex-start space-y-7 md:space-y-9">
            <h1 className="h2-bold md:h1-bold">
              Empowering Moments: Uniting Communities, One Event at a Time!
            </h1>
            <p className="p-regular-18 md:p-regular-20">
              Discover invaluable insights and guidance from over 1020 mentors
              across renowned companies, all within our vibrant global
              community.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Explore Now </Link>
            </Button>
          </div>
          <Image
            src="/assets/images/hero.png"
            alt="Home Page Illustration"
            width={1000}
            height={1000}
            className="object-cover rounded-xl md:rounded-2xl max-h-[70vh] object-center 2xl:max-h-[100vh] "
          />
        </section>
      </div>
      <section id="events" className="small-wrapper md:wrapper ">
        <h1 className=" p-bold-20 md:p-bold-24 px-5 md:px-0">
          Trusted by <br /> Thousands of Events Worldwide
        </h1>
        {/* <div className="flex-between w-full flex gap-2 flex-sm md:flex-row ">
          <Search />
          <CategoryFilter />
        </div> */}
        <div className="small-wrapper md:wrapper text-center  md:max-w-lg">
          <Collection
            data={events?.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={8}
            page={1}
            totalPages={2}
          />
        </div>
      </section>
    </>
  );
}
