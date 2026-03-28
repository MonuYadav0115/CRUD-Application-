const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connection is Okey");
})
.catch(() => {
    console.log("Error in DB Connection");
});

// Schema
const usersch = new mongoose.Schema({
    _id: String,
    name: String,
    place: String,
    gender: String,
    phoneNo: String,
    dob: Date
});

const um = mongoose.model("user", usersch);

// Routes
app.post("/add", async (req, res) => {
    try {
        const data = new um(req.body);
        await data.save();
        res.json({ message: "Data Added" });
    }
    catch {
        res.json({ message: "Error in adding details" });
    }
});

app.get("/data", async (req, res) => {
    try {
        const data = await um.find();
        res.json(data);
    }
    catch {
        res.json({ message: "Error in getting Data" });
    }
});

app.get("/search/:id", async (req, res) => {
    try {
        const data = await um.findById(req.params.id);
        res.json(data);
    }
    catch {
        res.json({ message: "Error in Searching Data" });
    }
});

// Delete
app.delete("/delete/:id", async (req, res) => {
  try {
    await um.findByIdAndDelete(req.params.id)
    res.json({ Message: "Data Deleted Successfully" })
  } catch {
    res.json({ Message: "Error in Deleting Data" })
  }
});

// 🔥 IMPORTANT: Use dynamic PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});