import { Button } from "@/components/ui/button";
import Collection from "@/components/ui/shared/Collection";
import { getEventById, getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.action";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const profilePage = async ({ searchParams }: SearchParamProps) => {
  // this will be used to get the user session data. i.e which user created the event
  const ordersPage = Number(searchParams?.orderspage) || 1;
  const eventsPage = Number(searchParams?.eventspage) || 1;
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const orders = await getOrdersByUser({ userId, page: ordersPage });
  const orderedEvents =
    orders?.data.map((order: IOrder) => {
      return order.event;
    }) || [];
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

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

      {/* Events ticket section */}
      <section className="small-wrapper md:wrapper text-center">
        <Collection
          data={orderedEvents}
          emptyTitle="No Events tickets Purchased yet "
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={4}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>
      <section className="bg-primary-50">
        <div className="wrapper flex-center flex-col md:flex-row flex-between">
          <h1 className="h2-bold">Events Organized</h1>

          <Button
            asChild
            className="capitalize hidden sm:inline-block rounded-full"
          >
            <Link href="/events/create">Create New Event</Link>
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
          limit={4}
          page={eventsPage}
          totalPages={organizedEvents?.totalPages}
          urlParamName="eventsPage"
        />
      </section>
    </>
  );
};
export default profilePage;
