import { getEventById } from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

const EventDetails = async ({ params: { id } }: SearchParamProps) => {
  const event = await getEventById(id);
  console.log(event);
  const {
    _id,
    title,
    description,
    location,
    imageUrl,
    startDateTime,
    endDateTime,
    price,
    isFree,
    url,
    category,
    organizer,
    createdAt,
    __v,
  } = event;
  return (
    <section className="flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={imageUrl} // Logo image source
          width={1000} // Logo image width
          height={1000} // Logo image height
          alt="logo" // Alt text for logo
          className=" min-h-[22rem] object-contain object-center 2xl:rounded-xl"
        />
        <div className="bg-grey-50 bg-cover bg-center">
          <div className="p-2 m-3 space-y-2 ">
            {/* Title */}
            <h1 className="p-bold-24 capitalize">{title}</h1>
            <div className="flex space-x-3">
              {/* pricing */}
              <div className=" bg-coral-100 w-16 text-center rounded-xl my-3 p-2">
                <p
                  className="text-coral-500  
                p-semibold-18"
                >
                  €{price}
                </p>
              </div>
              {/* Category Name */}
              <div className=" bg-grey-100 max-w-fit rounded-xl my-3 p-2">
                <p className="text-grey-500 p-regular-16 capitalize px-2">
                  {category.name}
                </p>
              </div>
            </div>
            {/* Organizer Name */}
            <div className="">
              <p>
                {`by `}
                <span className="capitalize text-primary p-medium-14">{`${organizer.firstName} | ${organizer.lastName}`}</span>
              </p>
            </div>
            {/* Date and Time */}
            <div className="flex items-center space-x-3 ">
              <Image
                src="/assets/icons/calendar.svg"
                // Logo image source
                width={25} // Logo image width
                height={25} // Logo image height
                alt="calender" // Alt text for logo
                className="-mx-1"
              />
              <p className="space-x-1 p-medium-12 md:p-medium-14 xl:p-medium-16">
                <span>{`${formatDateTime(startDateTime).dateOnly}`}</span>
                {` -`}
                <span>{`${formatDateTime(endDateTime).dateOnly}`}</span>
                {` /`}
                <span>{`${formatDateTime(startDateTime).timeOnly}`}</span>
                {` -`}
                <span>{`${formatDateTime(endDateTime).timeOnly}`}</span>
              </p>
            </div>
            {/* Location */}
            <div className="flex items-center space-x-3 ">
              <Image
                src="/assets/icons/location.svg"
                // Logo image source
                width={25} // Logo image width
                height={25} // Logo image height
                alt="calender" // Alt text for logo
                className="-mx-1"
              />
              <p className=" p-medium-12 md:p-medium-14 xl:p-medium-16 capitalize">
                {location}
              </p>
            </div>
            {/* Description */}
            <div className="">
              <p className=" p-medium-12 pb-3 md:p-medium-14 xl:p-medium-16  text-justify">
                {description}
              </p>
              <Link
                href={url}
                className=" text-wrap p-regular-14 text-justify underline text-primary hover:text-primary-100"
              >
                https://meetup.angular.love/angularspringcamp/
              </Link>
            </div>
          </div>
        </div>
            <div className="m-3 p-3">
              <h1 className="p-bold-24 my-3 capitalize">Related Event</h1>
            </div>
      </div>
    </section>
  );
};
export default EventDetails;
