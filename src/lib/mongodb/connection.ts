import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("If you runing the project in local host you need to define the MONGODB_URI environment variable inside .env");
}

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("Connection error: ", error);
  }
};

export default connectMongoDB;
