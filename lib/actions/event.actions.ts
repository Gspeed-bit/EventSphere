"use server";

import { CreateEventParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import { revalidatePath } from "next/cache";
import Category from "../database/models/categoty.model";

//Note if we call the getEventById function we will get all the params
//from the database but we wont get the orgnazer and category name and detail we
//will need to populate the category and organizer to get the params and not id

export async function populateEvent(query: any) {
  return query
    .populate({
      //this can be seen in the mongodb collections
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({
      path: "category",
      model: Category,
      select: "_id name",
    });
}

// CREATE
export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) {
      throw new Error("Organizer not found");
    }

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
}

//this was created to get eventId

export async function getEventById(eventId: string) {
  try {
    await connectToDatabase();

    //so wraping the populateEvent around the Event
    // will give us access to the param of the category 
    //and oragnizer and not the Id
    const event = await populateEvent(Event.findById(eventId));

    if (!event) {
      throw new Error("No such event exists");
    }
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
}
