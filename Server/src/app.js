import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN || "*",
        credentials: true,
    }),
);

app.use(express.json());

app.get("/", (_req, res) => {
    res.json({
        message: "Synapse backend is running",
    });
});

app.get("/api/health", (_req, res) => {
    res.json({
        message: "Synapse API working",
    });
});

app.use("/api/payments", paymentRoutes);

export default app;