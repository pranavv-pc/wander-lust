// Script written to add sample data to the database

import Listing from "../models/listing.js";
import sampleListing from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}

main()
    .then(() => {
        console.log("Connected to Database...");
    })
    .catch((err) => console.log(err))

    
async function initializeDB() {
    await Listing.deleteMany({});
    console.log("Previous/Garbage data deleted ~index.js");

    await Listing.insertMany(sampleListing);
    console.log("Sample Data was added ~index.js");
}

initializeDB();

