require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

const events = [
  {
    id: 1,
    sport: "Football",
    name: "India vs Australia",
    startAt: "2025-10-07T18:00:00Z",
    markets: [
      {
        name: "Match Winner",
        outcomes: [
          { key: "A", label: "India", odds: 1.8 },
          { key: "B", label: "Australia", odds: 2.1 },
        ],
      },
    ],
  },
  {
    id: 2,
    sport: "Cricket",
    name: "CSK vs MI",
    startAt: "2025-10-08T20:00:00Z",
    markets: [
      {
        name: "Match Winner",
        outcomes: [
          { key: "A", label: "CSK", odds: 1.9 },
          { key: "B", label: "MI", odds: 2.0 },
        ],
      },
    ],
  },
];

app.get("/api/events", (req, res) => {
  res.json({ success: true, data: events });
});

app.get("/", (req, res) => {
  res.send("Sports Backend Running Successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
