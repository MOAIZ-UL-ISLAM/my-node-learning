import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

// Connect to MongoDB
const connectDB =  async () : Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log("MongoDB connected successfully!");
  } catch (error:any) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
}
export default connectDB;