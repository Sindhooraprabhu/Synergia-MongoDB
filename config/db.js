import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Mongodb_URI);
        console.log(" Mnogodb connected succesfully");

    }
    catch (error) {
        console.log(" Mongodb connection failed:", error.message);
        process.exit(1);
    };
};