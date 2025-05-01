import mongoose from 'mongoose';

global.mongoose = {
    conn: null,
    promise: null,
}

export async function dbConnect() {
    if (global.mongoose && global.mongoose.conn) {
        console.log("Connected from previous")
        return global.mongoose.conn;
    }
    else {
        const conString = process.env.MONGO_URL;
        console.log("MONGO_URL:", process.env.MONGO_URL);

        if (!conString) {
            throw new Error("MONGO_URL environment variable not set");
        }
        
        const promise = mongoose.connect(conString, {
            autoIndex: true,
        });

        global.mongoose = {
            conn: await promise, 
            promise,
        };

        return await promise;
    }
}