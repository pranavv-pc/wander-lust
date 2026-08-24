import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        filename: {
            type: String,
            default: "listingImage"
        },
        url: {
            type: String,
            // If url is not defined or it is undefined then the above url will be saved:
            default: "https://img.magnific.com/free-vector/villa-logo-business-corporate-identity-illustration_53876-114656.jpg?semt=ais_hybrid&w=740&q=80",
            // If link is not provided by the client or the input field or url is kept empty (it is for the client):
            // set: (v) => v === "" ? "https://images.unsplash.com/photo-1586810724476-c294fb7ac01b?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
            set: (v) => v === "" ? "https://img.magnific.com/free-vector/villa-logo-business-corporate-identity-illustration_53876-114656.jpg?semt=ais_hybrid&w=740&q=80" : v
        }
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String
    },
    country: {
        type: String
    }
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;

