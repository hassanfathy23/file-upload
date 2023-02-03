import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("already connected");
      return;
    }

    mongoose.set('strictQuery', true);

    await mongoose.connect(process.env.MONGO_URI!)
    console.log("connected to db")
  } catch (err) {
    throw new Error("error occured when connecting to database");
  }
}
