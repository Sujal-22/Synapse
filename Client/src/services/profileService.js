import { supabase } from "../lib/supabase";

export function normalizeUsername(value = "") {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9_-]/g, "");
}

export function validateUsername(username = "") {
    if (!username.trim()) {
        return "Username is required.";
    }

    if (username.length < 3) {
        return "Username must be at least 3 characters.";
    }

    if (username.length > 20) {
        return "Username must be 20 characters or less.";
    }

    if (!/^[a-z0-9_-]+$/.test(username)) {
        return "Use only lowercase letters, numbers, hyphen or underscore.";
    }

    if (/^[-_]/.test(username) || /[-_]$/.test(username)) {
        return "Username cannot start or end with hyphen or underscore.";
    }

    return null;
}

export async function checkUsernameAvailability(username) {
    const normalizedUsername = normalizeUsername(username);
    const validationError = validateUsername(normalizedUsername);

    if (validationError) {
        return {
            available: false,
            username: normalizedUsername,
            error: validationError,
        };
    }

    const { data, error } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", normalizedUsername)
        .maybeSingle();

    if (error) {
        return {
            available: false,
            username: normalizedUsername,
            error: error.message,
        };
    }

    return {
        available: !data,
        username: normalizedUsername,
        error: data ? "Username is already taken." : null,
    };
}