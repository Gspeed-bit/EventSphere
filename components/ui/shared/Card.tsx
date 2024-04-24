import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";

type cardProps = {
  event: IEvent;
  hasOrderLink: Boolean;
  hidePrice: Boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: cardProps) => {
  return (
    <div className="shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] rounded-xl ">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className=" flex flex-grow bg-cover bg-center bg-primary-50 min-h-[150px] md:min-h-[200px]"
      />
      <Link href={`/events/${event._id}`}>
        <section className="flex justify-start text-start px-2  ">
          <div className="p-1 m-1 space-y-1 ">
            <div className="flex space-x-3">
              {/* pricing */}
              <div className=" bg-coral-100 w-12 rounded-xl my-3 p-2">
                <p
                  className="text-coral-500  
                  p-medium-12 text-center"
                >
                  {event.isFree ? "Free" : `€${event.price}`}
                </p>
              </div>
              {/* Category Name */}
              <div className=" bg-primary-50 max-w-fit rounded-xl my-3 p-2">
                <p className="text-primary-600 p-medium-12 capitalize px-2">
                  {event.category.name}
                </p>
              </div>
            </div>

            {/* Date and Time */}
            <p className="space-x-1 p-medium-12 text-grey-500 ">
              <span>{`${formatDateTime(event.startDateTime).dateOnly}`}</span>
              {`,`}
              <span>{`${formatDateTime(event.startDateTime).timeOnly}`}</span>
            </p>
            {/* Title */}
            <h1 className="p-medium-14 pb-3">{event.title}</h1>
            {/* Organizer Name */}
            <p className="capitalize text-primary p-medium-12 py-2  ">
              {event.organizer.firstName} | {event.organizer.lastName}
            </p>
          </div>
        </section>
      </Link>
    </div>
  );
};
export default Card;
