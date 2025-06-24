import mongoose from "mongoose";
import path from "path"
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI!);
        console.log(`MongoDB connected`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};
