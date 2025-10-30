import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { Event } from "./models/events.js";

dotenv.config();

const app = express();
const PORT = 5001;

app.use(express.json());


connectDB();


app.post("/api/bookings", async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/bookings", async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/bookings/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/api/bookings/:id", async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event updated successfully", event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.delete("/api/bookings/:id", async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully", event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




app.get("/api/bookings/search", async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ message: "Email query parameter is required" });
        }

        const events = await Event.find({ email: { $regex: email, $options: "i" } });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get("/api/bookings/filter", async (req, res) => {
    try {
        const { event } = req.query;
        if (!event) {
            return res.status(400).json({ message: "Event query parameter is required" });
        }

        const events = await Event.find({ event: { $regex: event, $options: "i" } });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
