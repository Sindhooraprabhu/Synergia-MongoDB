import mongoose from "mongoose";
const eventschema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        default: "CSE"
    },
    year: {
        type: Number
    },
    email: {
        type: String,
        required: true
    },
    event: {
        type: String,
        event: true
    },
    ticketType: String,
    createdAt: { type: Date, default: Date.now }

});
export const Event = mongoose.model("Event", eventschema);



