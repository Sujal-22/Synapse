import { supabase } from "../lib/Supabase";

const API_URL = import.meta.env.VITE_API_URL;

async function getAuthToken() {
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    if (error || !session?.access_token) {
        throw new Error("User is not authenticated");
    }

    return session.access_token;
}

export async function generatePostHackathonReport(submissionId) {
    const token = await getAuthToken();

    const response = await fetch(`${API_URL}/api/post-hackathon/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ submissionId }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to generate report");
    }

    return data;
}

export async function getPostHackathonReport(submissionId) {
    const token = await getAuthToken();

    const response = await fetch(
        `${API_URL}/api/post-hackathon/submission/${submissionId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch report");
    }

    return data;
}