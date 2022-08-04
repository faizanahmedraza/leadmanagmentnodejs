require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const cluster = process.env.DATABASE_CLUSTER;
const dbname = process.env.DATABASE_NAME;

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}`);
        console.log("Connected successfully");
    } catch (error) {
        console.log("connection error: " + error);
    }
};

module.exports = connectDB;
