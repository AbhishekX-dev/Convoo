import mongoose from "mongoose"


export const ConnectDB=async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");

        
    } catch (error) {
        console.log("MongoDB connection error",error);
        
    }

}