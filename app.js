import methodOverride from "method-override";
import Listing from "./models/listing.js";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import engine from "ejs-mate";
import expres from "express";
import path from "path";

dotenv.config();

const app = expres();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", engine);
app.use(methodOverride("_method"));
app.use(expres.urlencoded({ extended: true }));
app.use(expres.static(path.join(__dirname, "/public")));

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;


async function main() {
    await mongoose.connect(MONGO_URI);
}

main()
    .then(() => {
        console.log("Connected to Database...");
    })
    .catch((err) => console.log(err));


/* app.get("/testlisting", async (req, res) => {
    let newListing = new Listing({
        title: "Royal Vintage Stay",
        description: "This place offers a great vintage experience.",
        image: {
            fileName: "Vintage Villa"
        },
        price: 4699,
        location: "Aalborg",
        country: "Denmark"
    });

    await newListing.save();
    res.send("Sample Listing was added...");
    console.log("Sample Listing was added ~app.js");
}); */


// Index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

// Show route
app.get("/listings/:id/show", async (req, res) => {
    let { id } = req.params;
    const listingInfo = await Listing.findById(id)
    res.render("listings/show.ejs", { listingInfo });
});

app.get("/listings/new", (req, res) => {
    res.render("listings/newListing.ejs");
});

app.post("/listings", async (req, res) => {
    const newListing = {
        title: req.body.title,
        description: req.body.description,
        image: {
            filename: req.body.filename,
            url: req.body.url
        },
        price: req.body.price,
        location: req.body.location,
        country: req.body.country
    }
    let insertedData = await Listing.insertOne(newListing);

    /* let newListing = req.body.newListing;
    let insertedData = await Listing.insertOne(newListing); */
    // newListing[title...,price...,etc...]

    console.log("New listing inserted in db...")
    console.log("Inserted listing: ", insertedData);

    res.redirect("/listings");
});

app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    res.render("listings/edit.ejs", { listing });
});


app.route("/listings/:id")
    .put(async (req, res) => {
        let { id } = req.params;

        let updatedListing = await Listing.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                description: req.body.description,
                image: {
                    filename: req.body.filename,
                    url: req.body.url
                },
                price: req.body.price,
                location: req.body.location,
                country: req.body.country
            }/* ,
            { new: true } */
        );

        console.log("Updated: ", updatedListing);

        res.redirect("/listings");
    })
    .delete(async (req, res) => {
        let { id } = req.params;

        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log("Deleted: ", deletedListing);

        res.redirect("/listings");
    });


/* app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;

    let updatedListing = await Listing.findByIdAndUpdate(
        id,
        {
            title: req.body.title,
            description: req.body.description,
            image: {
                filename: req.body.filename,
                url: req.body.url
            },
            price: req.body.price,
            location: req.body.location,
            country: req.body.country
        }
    );

    console.log("Updated: ", updatedListing);

    res.redirect("/listings");
}); */

/* app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;

    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log("Deleted: ", deletedListing);

    res.redirect("/listings");
}); */


app.use((req, res) => {
    res.status(404).send("<h2 style='text-align: center;'>404 - Page not found / Invalid Page</h2>");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

