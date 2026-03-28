import mongoose from "mongoose";

const connectDB = async () => {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/jobportal";
    if (!process.env.MONGO_URI) {
        console.warn("WARNING: process.env.MONGO_URI is not defined. Using fallback local MongoDB URI:", uri);
        console.warn("Create a backend/.env file (copy backend/.env.example) and set MONGO_URI for production.");
    }

    try {
        await mongoose.connect(uri);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message || error);
        // rethrow so callers can handle or process exits after logging if desired
        throw error;
    }
}

export default connectDB;