import { supabaseAdmin } from "../lib/supabaseAdmin.js";

export async function requireAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Missing auth token" });
        }

        const token = authHeader.replace("Bearer ", "");

        const {
            data: { user },
            error,
        } = await supabaseAdmin.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ message: "Invalid auth token" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Auth verification failed",
            error: error.message,
        });
    }
}