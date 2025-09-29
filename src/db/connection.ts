import mongoose from "mongoose";
import { devConfig } from "../config/env/dev.config";
// export const connectDB = async () => {
//     await mongoose.connect(devConfig.DB_URL as string,
//         { timeoutMS: 5000 }).then(() => {
//             console.log("Connected to MongoDB");
//         }).catch((error) => {
//             console.log("Error connecting to MongoDB", error);
//         });
// }

// export const connectDB = async (): Promise<void> => {
//     try {
//         await mongoose.connect(devConfig.DB_URL as string, {
//             serverSelectionTimeoutMS: 5000,
//             connectTimeoutMS: 10000,
//         });
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// }

 export const connectDB = async () => {
    try {
        await mongoose.connect(devConfig.DB_URL as string);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Failed to connect to MongoDB", error);
    }
}