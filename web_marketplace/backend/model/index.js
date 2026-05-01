import mongoose from "mongoose";

async function connectDB(MONGO_URL) {
    try {
        
        await mongoose.connect(MONGO_URL);
        console.log('Database Connected');
    } catch (err) {
        console.error("Databases Not Connected check model/index.js",err);
        process.exit(1);
    }
}
export default connectDB;