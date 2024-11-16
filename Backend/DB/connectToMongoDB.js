import mongoose from "mongoose";

const connectToMongoDB=async()=>{
    try {
        await mongoose.connect(process.env.Mongo_connection);
        console.log("connected to mongoDb")
    } catch (error) {
        console.log("error in connecting to mongoDb" ,error.message)

    }
}

export default connectToMongoDB