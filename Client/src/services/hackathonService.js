import { supabase } from "../lib/supabase";

export async function getHackathons(filters = {}) {
    let query = supabase
        .from("hackathons")
        .select("*")
        .order("start_date", { ascending: true });

    if (filters.status) {
        query = query.eq("status", filters.status);
    }

    if (filters.organiserId) {
        query = query.eq("organiser_id", filters.organiserId);
    }

    if (filters.search) {
        query = query.ilike("title", `%${filters.search}%`);
    }

    const { data, error } = await query;

    return { data: data || [], error };
}

/**
 * Get only upcoming hackathons for Explore page.
 */
export async function getUpcomingHackathons() {
    const { data, error } = await supabase
        .from("hackathons")
        .select("*")
        .eq("status", "upcoming")
        .order("start_date", { ascending: true });

    return { data: data || [], error };
}

/**
 * Get ongoing hackathons.
 */
export async function getOngoingHackathons() {
    const { data, error } = await supabase
        .from("hackathons")
        .select("*")
        .eq("status", "ongoing")
        .order("end_date", { ascending: true });

    return { data: data || [], error };
}

/**
 * Get one hackathon by ID.
 */
export async function getHackathonById(hackathonId) {
    if (!hackathonId) {
        return { data: null, error: "Hackathon ID is required." };
    }

    const { data, error } = await supabase
        .from("hackathons")
        .select("*")
        .eq("id", hackathonId)
        .single();

    return { data, error };
}

/**
 * Create hackathon.
 * Used by organiser.
 */
export async function createHackathon(payload) {
    const { data, error } = await supabase
        .from("hackathons")
        .insert(payload)
        .select()
        .single();

    return { data, error };
}

/**
 * Update hackathon.
 * Used by organiser.
 */
export async function updateHackathon(hackathonId, updates) {
    if (!hackathonId) {
        return { data: null, error: "Hackathon ID is required." };
    }

    const { data, error } = await supabase
        .from("hackathons")
        .update(updates)
        .eq("id", hackathonId)
        .select()
        .single();

    return { data, error };
}

/**
 * Register current user for a hackathon.
 */
export async function registerForHackathon(hackathonId, userId) {
    if (!hackathonId || !userId) {
        return {
            data: null,
            error: "Hackathon ID and User ID are required.",
        };
    }

    const { data, error } = await supabase
        .from("registrations")
        .insert({
            hackathon_id: hackathonId,
            user_id: userId,
        })
        .select()
        .single();

    return { data, error };
}

/**
 * Check if user is already registered.
 */
export async function checkRegistration(hackathonId, userId) {
    if (!hackathonId || !userId) {
        return {
            data: false,
            error: "Hackathon ID and User ID are required.",
        };
    }

    const { data, error } = await supabase
        .from("registrations")
        .select("id")
        .eq("hackathon_id", hackathonId)
        .eq("user_id", userId)
        .maybeSingle();

    return { data: Boolean(data), error };
}

/**
 * Get logged-in user's registered hackathons.
 */
export async function getMyRegistrations(userId) {
    if (!userId) {
        return { data: [], error: "User ID is required." };
    }

    const { data, error } = await supabase
        .from("registrations")
        .select(
            `
      id,
      registered_at,
      hackathons (
        id,
        title,
        description,
        banner_url,
        start_date,
        end_date,
        registration_deadline,
        tags,
        prize_pool,
        max_team_size,
        min_team_size,
        status
      )
    `,
        )
        .eq("user_id", userId)
        .order("registered_at", { ascending: false });

    return { data: data || [], error };
}

/**
 * Get current user's ongoing registered hackathon.
 * Useful for Dashboard ActiveBanner.
 */
export async function getMyActiveHackathon(userId) {
    if (!userId) {
        return { data: null, error: "User ID is required." };
    }

    const { data, error } = await supabase
        .from("registrations")
        .select(
            `
      id,
      registered_at,
      hackathons (
        id,
        title,
        description,
        banner_url,
        start_date,
        end_date,
        registration_deadline,
        tags,
        prize_pool,
        max_team_size,
        min_team_size,
        status
      )
    `,
        )
        .eq("user_id", userId)
        .eq("hackathons.status", "ongoing")
        .limit(1)
        .maybeSingle();

    return { data: data?.hackathons || null, error };
}

/**
 * Cancel registration.
 */
export async function unregisterFromHackathon(hackathonId, userId) {
    if (!hackathonId || !userId) {
        return {
            data: null,
            error: "Hackathon ID and User ID are required.",
        };
    }

    const { data, error } = await supabase
        .from("registrations")
        .delete()
        .eq("hackathon_id", hackathonId)
        .eq("user_id", userId)
        .select();

    return { data, error };
}

/**
 * Get registrations for organiser dashboard.
 */
export async function getHackathonRegistrations(hackathonId) {
    if (!hackathonId) {
        return { data: [], error: "Hackathon ID is required." };
    }

    const { data, error } = await supabase
        .from("registrations")
        .select(
            `
      id,
      registered_at,
      profiles (
        id,
        full_name,
        username,
        avatar_url,
        college,
        year_of_study,
        skills,
        domains
      )
    `,
        )
        .eq("hackathon_id", hackathonId)
        .order("registered_at", { ascending: false });

    return { data: data || [], error };
}