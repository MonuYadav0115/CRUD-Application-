const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/v25hfs2mern1db")
.then(() => {
    console.log("Connection is Okey");
})
.catch(() => {
    console.log("Error in DB Connection");
});

const usersch = new mongoose.Schema({
    _id: String,
    name: String,
    place: String,
    gender: String,
    phoneNo: String,
    dob: Date
});

const um = mongoose.model("user", usersch);

const app = express();

app.use(express.json());
app.use(cors());

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

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


// Delete the Data

app.delete("/delete/:id", async (req, res) => {
  try {
    await um.findByIdAndDelete(req.params.id)
    res.json({ Message: "Data Deleted Successfully" })
  } catch {
    res.json({ Message: "Error in Deleting Data" })
  }
})
