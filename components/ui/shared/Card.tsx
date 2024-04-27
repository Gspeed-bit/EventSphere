import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import DeleteConfirmation from "./DeleteConfirmation";

type cardProps = {
  event: IEvent;
  hasOrderLink: Boolean;
  hidePrice: Boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: cardProps) => {
  // here i want to check if the user login id is eqaul to the event organizer id
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = userId === event.organizer._id.toString();
  return (
    <div className=" relative shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] rounded-xl ">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className=" flex flex-grow bg-cover bg-center bg-primary-50 min-h-[150px] md:min-h-[200px]"
      />

      {/* if the user is the creator of the event and the hidePrice is false then show the edit icon */}
      {isEventCreator && !hidePrice && (
        <div className="absolute top-2 right-2 flex flex-col gap-4 rounded-xl bg-[#fff4e0] p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
              className="cursor-pointer  "
            />
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}
      <div>
        <section className=" w-full text-start px-2  ">
          <div className="p-1 m-1 space-y-1 ">
            <div className="flex space-x-3">
              {/* pricing */}
              {!hidePrice && (
                <div className=" bg-coral-100 w-12 rounded-xl my-3 p-2">
                  <p
                    className="text-coral-500  
                  p-medium-12 text-center"
                  >
                    {event.isFree ? "Free" : `€${event.price}`}
                  </p>
                </div>
              )}
              {/* Category Name */}
              <div className=" bg-primary-50 max-w-fit rounded-xl my-3 p-2">
                <p className="text-primary-600 p-medium-12 capitalize px-2">
                  {event.category.name}
                </p>
              </div>
            </div>
            {/* Title */}
            <Link href={`/events/${event._id}`}>
              <h1 className="p-medium-14 pb-3 capitalize">{event.title}</h1>

              {/* Date and Time */}
              <p className="space-x-1 p-medium-12 text-grey-500 ">
                <span>{`${formatDateTime(event.startDateTime).dateOnly}`}</span>
                {`,`}
                <span>{`${formatDateTime(event.startDateTime).timeOnly}`}</span>
              </p>

              <div className="flex items-center justify-between w-full  gap-3">
                {/* Organizer Name */}
                <p className="capitalize text-primary p-medium-12 py-2  ">
                  {event.organizer.firstName} | {event.organizer.lastName}
                </p>
                {hasOrderLink && (
                  <div className="flex gap-2 items-center ">
                    <p className="p-medium-12"> order details</p>
                    <Image
                      src="/assets/icons/arrow.svg"
                      alt="search"
                      width={11}
                      height={11}
                      className="cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Card;
