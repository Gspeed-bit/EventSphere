import EventForm from "@/components/ui/shared/EventForm";
import { auth } from "@clerk/nextjs";

const updateEvent = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="wrapper bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5">
        <div className="flex flex-sm ">
          <h1 className="h3-bold">Update Event</h1>
        </div>
      </section>
      <div className="wrapper">
        <EventForm userId={userId} type="update" />
      </div>
    </>
  );
};
export default updateEvent;
