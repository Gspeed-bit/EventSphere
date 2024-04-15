import mongoose from "mongoose";

// Get the MongoDB connection URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Global variable to cache the MongoDB connection
let cached = (global as any).mongoose || { conn: null, promise: null };

// Function to connect to the MongoDB database
export const connectToDatabase = async () => {
  // If the connection is already established, return the cached connection
  if (cached.conn) return cached.conn;

  // If the MongoDB URI is not defined, throw an error
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  // If the connection is not yet established, create a new connection
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "eventSphere", // Name of the MongoDB database
      bufferCommands: false, // Disable buffering of commands
    });

  // Await the connection promise and store the connection in the cache
  cached.conn = await cached.promise;

  // Return the MongoDB connection
  return cached.conn;
};
