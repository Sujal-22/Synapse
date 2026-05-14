import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postHackathonRoutes from "./routes/postHackathonRoutes.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
    res.json({
        message: "Synapse server is running",
    });
});

app.use("/api/post-hackathon", postHackathonRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});