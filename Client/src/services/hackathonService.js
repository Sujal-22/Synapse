import { supabase } from "../lib/supabase";

export async function createHackathon(payload) {
    const { data, error } = await supabase
        .from("hackathons")
        .insert(payload)
        .select("*")
        .single();

    return { data, error };
}

export async function getHackathons(filters = {}) {
    let query = supabase
        .from("hackathons")
        .select("*")
        .order("created_at", { ascending: false });

    if (filters.status) {
        query = query.eq("status", filters.status);
    }

    if (filters.search) {
        query = query.or(
            `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`,
        );
    }

    const { data, error } = await query;

    return {
        data: data || [],
        error,
    };
}

export async function getHackathonById(id) {
    const { data, error } = await supabase
        .from("hackathons")
        .select("*")
        .eq("id", id)
        .single();

    return { data, error };
}

export async function registerForHackathon(hackathonId, userId) {
    const { data, error } = await supabase
        .from("registrations")
        .insert({
            hackathon_id: hackathonId,
            user_id: userId,
            status: "registered",
        })
        .select("*")
        .single();

    return { data, error };
}

export async function checkRegistration(hackathonId, userId) {
    const { data, error } = await supabase
        .from("registrations")
        .select("id")
        .eq("hackathon_id", hackathonId)
        .eq("user_id", userId)
        .maybeSingle();

    return {
        data: Boolean(data),
        error,
    };
}

export async function getMyRegistrations(userId) {
    const { data, error } = await supabase
        .from("registrations")
        .select("*, hackathons(*)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    return {
        data: data || [],
        error,
    };
}