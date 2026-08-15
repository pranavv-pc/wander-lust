import mongoose from "mongoose";
import sampleListing from "./data.js";
import Listing from "../models/listing.js";

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
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

