import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postHackathonRoutes from "./src/routes/postHackathonRoutes.js"
import paymentRoutes from "./src/routes/paymentRoutes.js"

dotenv.config();

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    }),
);

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Synapse server is running",
    });
});

app.use("/api/post-hackathon", postHackathonRoutes);

app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});