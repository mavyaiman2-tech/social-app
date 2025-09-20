import mongoose from "mongoose";
export const connectDB = async () => {
   await mongoose.connect(process.env.DB_URL as string,
    {timeoutMS:5000}).then(() => {
       console.log("Connected to MongoDB");
   }).catch((error) => {
       console.log("Error connecting to MongoDB",error);
   });
}