import { Button } from "@/components/ui/button";
import Collection from "@/components/ui/shared/Collection";
import { getEventById, getEventsByUser } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const profilePage = async () => {
  // this will be used to get the user session data. i.e which user created the event

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const organizedEvents = await getEventsByUser({ userId, page: 1 });

  return (
    <>
      <section className="bg-primary-50">
        <div className="wrapper flex-center flex-col md:flex-row flex-between">
          <h1 className="h2-bold">My Tickets</h1>
          <Button
            asChild
            className="capitalize hidden sm:inline-block rounded-full"
          >
            <Link href="/#events">explore more event</Link>
          </Button>
        </div>
      </section>

      {/* Events Organized section */}
      <section className="small-wrapper md:wrapper text-center">
        {/* <Collection
          data={organizedEvents?.data}
          emptyTitle="No Events have been created yet "
          emptyStateSubtext="Come back later, events are coming soon."
          
          limit={6}
          page={1}collectionType="Event_Organized"
          totalPages={2}
          urlParamName="eventsPage"
        /> */}

        {/* <Collection
          data={[]}
          emptyTitle="No Events tickets Purchased yet "
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={6}
          page={1}
          totalPages={2}
        /> */}
      </section>
      <section className="bg-primary-50">
        <div className="wrapper flex-center flex-col md:flex-row flex-between">
          <h1 className="h2-bold">Events Organized</h1>

          <Button
            asChild
            className="capitalize hidden sm:inline-block rounded-full"
          >
            <Link href="/#events">Create New Event</Link>
          </Button>
        </div>
      </section>

      {/* Events Organized data */}
      <section className="small-wrapper md:wrapper text-center">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No Events have been created yet "
          emptyStateSubtext="Come back later, events are coming soon."
          collectionType="Event_Organized"
          limit={8}
          page={1}
          totalPages={2}
          urlParamName="eventsPage"
        />
      </section>
    </>
  );
};
export default profilePage;
