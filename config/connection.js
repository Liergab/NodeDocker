import mongoose from "mongoose";

const db = async() => {
    try {
        const connectiondb = await mongoose.connect(process.env.MONGO_URL);
        console.log(`${connectiondb.connection.host} ${connectiondb.connection.name}`)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default db