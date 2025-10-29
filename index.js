import express from "express";

const app = express();
const PORT = 5001;


app.use(express.json());


let bookings = [
    {
        id: 1,
        name: "Gaurav",
        branch: "CS",
        year: "2nd",
        email: "gaurav2@gmail.com",
        event: "Coding Competition"
    }
];


app.get("/api/bookings", (req, res) => {
    res.status(200).json(bookings);
});


app.post("/api/bookings", (req, res) => {
    const { name, branch, year, email, event } = req.body;

    if (!name || !branch || !year || !email || !event) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newBooking = {
        id: bookings.length + 1,
        name,
        branch,
        year,
        email,
        event,
    };

    bookings.push(newBooking);

    res.status(201).json({
        message: "Booking added successfully",
        booking: newBooking,
    });
});


app.get("/api/bookings/:id", (req, res) => {
    const booking = bookings.find((b) => b.id == req.params.id);

    if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
});


app.put("/api/bookings/:id", (req, res) => {
    const index = bookings.findIndex((b) => b.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Booking not found" });
    }

    const { name, branch, year, email, event } = req.body;


    bookings[index] = {
        ...bookings[index],
        name: name || bookings[index].name,
        branch: branch || bookings[index].branch,
        year: year || bookings[index].year,
        email: email || bookings[index].email,
        event: event || bookings[index].event,
    };

    res.status(200).json({
        message: "Booking updated successfully",
        booking: bookings[index],
    });
});


app.delete("/api/bookings/:id", (req, res) => {
    const index = bookings.findIndex((b) => b.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Booking not found" });
    }

    const deletedBooking = bookings.splice(index, 1);

    res.status(200).json({
        message: "Booking cancelled successfully",
        deletedBooking,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
