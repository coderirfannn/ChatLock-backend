import mongoose from "mongoose"
import { ENV } from "./env.js";

export const connetDB = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URI)
        console.log("Connected to DB Successfully");
    } catch (error) {
        console.log("Error Connecting in Database");
        process.exit(1)
    }
}