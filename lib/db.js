import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if(!MONGODB_URI){
    throw new Error("check your DataBase connection string")
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null}
}

export async function connectDB(){
    // DB connection already exists
    if(cached.conn){
        return cached.conn
    }

    // no DB connection and no promise trying to make connection
    if(!cached.promise){
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        };

        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then(() => 
            mongoose.connection
        )
    }

    // no DB connection but promise is trying to make DB connection
    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
    }

    return cached.conn
}