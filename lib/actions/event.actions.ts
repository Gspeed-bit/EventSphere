"use server";


import { CreateEventParams, DeleteEventParams, GetAllEventsParams, GetEventsByUserParams, GetRelatedEventsByCategoryParams, UpdateEventParams } from "@/types";
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

//this was created to get all event

export async function getAllEvents({
  query,
  limit,
  category,
  page, 
}: GetAllEventsParams) {
  try {
    // conecting to the database
    await connectToDatabase();

    const conditions = {};

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(0)
      .limit(limit);

      const events = await populateEvent(eventsQuery);
      const eventsCount = await Event.countDocuments(conditions);
    return {
      data:JSON.parse(JSON.stringify(events)),
      totalPages:Math.ceil(eventsCount/limit),
    };
  } catch (error) {
    handleError(error);
  }
}



//this was created to delete event

export async function deleteEvent({eventId, path}: DeleteEventParams) {
  try {
    await connectToDatabase();

    const deleteEvent = await Event.findByIdAndDelete(eventId);

    // this will revalidate the path means we wnat to clear the cache and refecth all the event because the event structure have chnaged
    if (deleteEvent) revalidatePath(path)
  } catch (error) {
    handleError(error);
  }
}


// UPDATE
export async function updateEvent({ userId, event, path }: UpdateEventParams) {
  try {
    await connectToDatabase()

    const eventToUpdate = await Event.findById(event._id)
    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error('Unauthorized or event not found')
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedEvent))
  } catch (error) {
    handleError(error)
  }
}



// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
export async function getRelatedEventsByCategory({
  categoryId,
  eventId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] }

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}



// GET EVENTS BY ORGANIZER
export async function getEventsByUser({ userId, limit = 6, page }: GetEventsByUserParams) {
  try {
    await connectToDatabase()

    const conditions = { organizer: userId }
    const skipAmount = (page - 1) * limit

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}