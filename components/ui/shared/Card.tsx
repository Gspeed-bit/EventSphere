import { IEvent } from "@/lib/database/models/event.model";

type cardProps = {
  event: IEvent,
  hasOrderLink:Boolean,
  hidePrice:Boolean,
};


const Card = ({ event, hasOrderLink, hidePrice }: cardProps) => {
  return <div className="small-wrapper md:wrapper">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione veniam ex, repudiandae ab iusto nemo voluptas minus </p>
  </div>;
};
export default Card;
