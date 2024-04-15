

// Importing necessary types and functions from external libraries
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines multiple class values into a single string using tailwind and clsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formats a given date string into various date and time formats
export const formatDateTime = (dateString: Date) => {
  // Options for formatting the full date and time
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  // Options for formatting date only
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  // Options for formatting time only
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  // Formatting the full date and time
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  // Formatting the date only
  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  // Formatting the time only
  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  // Return an object containing formatted date and time strings
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

// Converts a File object to a data URL
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// Formats a price string into currency format (USD)
export const formatPrice = (price: string) => {
  const amount = parseFloat(price);
  // Formatting the price into currency format
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  // Return the formatted price string
  return formattedPrice;
};

// Handles errors by logging them and throwing a new error
export const handleError = (error: unknown) => {
  // Logging the error to the console
  console.error(error);

  // Throwing a new error with the error message
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};
