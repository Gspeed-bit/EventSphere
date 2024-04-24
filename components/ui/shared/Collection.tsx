import { IEvent } from "@/lib/database/models/event.model";
import { Divide } from "lucide-react";
import Card from "./Card";

type collectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  totalPages?: number;
  page: number | string;
  urlParamName?: string;
  collectionType?: "Event_Organized" | "My_Tickets" | "All_Events";
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  collectionType,
  limit,
  totalPages = 0,
  page,
  urlParamName,
}: collectionProps) => {
  //   const {
  //   _id,title,description,location,imageUrl,startDateTime,endDateTime,price,isFree,url,category,organizer,createdAt,__v,
  // } = event;
  return (
    <>
      {data.length > 0 ? (
        <div className=" small-wrapper md:wrapper  ">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3  ">
            {data.map((event) => {
              const hasOrderLink = collectionType === "Event_Organized";
              const hidePrice = collectionType === "My_Tickets";
              return (
                <li className=" ">
                  <Card
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="bg-grey-100 rounded-xl grid grid-col-1 p-10 ">
          <div className=" flex-col flex-center md:p-7 ">
            <h3 className="p-bold-24 md:h3-bold">{emptyTitle}</h3>
            <h4 className="p-medium-18 md:p-medium-20">{emptyStateSubtext}</h4>
          </div>
        </div>
      )}
    </>
  );
};
export default Collection;
