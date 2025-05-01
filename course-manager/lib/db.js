// Import Mongoose 
import mongoose from 'mongoose';

// Use a global object to cache the MongoDB connection across serverless function 
// This prevents creating multiple connections
global.mongoose = {
    conn: null,    // Holds the established connection (if any)
    promise: null, // Holds the connection promise during the initial connection attempt
};

// Asynchronous function to connect to MongoDB
export async function dbConnect() {
    // If a connection already exists, reuse it
    if (global.mongoose && global.mongoose.conn) {
        console.log("Connected from previous"); // Log reuse
        return global.mongoose.conn;            // Return the cached connection
    } 
    else {
        // Load the DB connection string from environment variables
        const conString = process.env.MONGO_URL;
        console.log("MONGO_URL:", process.env.MONGO_URL); // Useful for debugging

        // If the environment variable is not set, throw an error
        if (!conString) {
            throw new Error("MONGO_URL environment variable not set");
        }

        // Start a new connection using Mongoose
        // autoIndex is enabled to build indexes automatically
        const promise = mongoose.connect(conString, {
            autoIndex: true,
        });

        // Store the connection and promise in the global object
        global.mongoose = {
            conn: await promise,  // The resolved connection
            promise,              // The promise object while connecting
        };

        // Return the resolved connection
        return await promise;
    }
}
