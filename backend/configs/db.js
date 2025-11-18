import mongoose from "mongoose";

const connectDB = async () => {
    const mongodbUri = process.env.MONGODB_URI;
    if (!mongodbUri) {
        throw new Error("MONGODB_URI environment variable is not set");
    }

    try {
        mongoose.connection.on("connected", () => {
            console.log("Database connected successfully");
        });
        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
        });

        const dbName = process.env.MONGODB_DB_NAME;
        await mongoose.connect(mongodbUri, dbName ? { dbName } : undefined);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
};

export default connectDB;