import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const connectMongoDB = async () =>{
  try {
   await mongoose.connect(MONGODB_URI);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("shit, ", error);
  }
};

export default connectMongoDB;
