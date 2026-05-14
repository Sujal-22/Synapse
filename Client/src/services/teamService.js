import { supabase } from '../lib/supabase'

export const teamService = {
    /** Get open teams for a hackathon */
    async getOpenTeams(hackathonId) {
        return supabase
            .from('teams')
            .select('*, leader:profiles!leader_id(full_name, avatar_url, skills)')
            .eq('hackathon_id', hackathonId)
            .eq('is_open', true)
    },

    /** Create a new team */
    async create({ hackathonId, name, leaderId, neededSkills }) {
        return supabase.from('teams').insert({
            hackathon_id: hackathonId,
            name,
            leader_id: leaderId,
            needed_skills: neededSkills,
            is_open: true,
        }).select().single()
    },

    /** Join a team */
    async join(teamId, userId) {
        return supabase.from('team_members').insert({ team_id: teamId, user_id: userId })
    },

    /** Get AI-suggested teammates based on skill overlap */
    async getSuggestions(hackathonId, userId, userSkills) {
        const { data } = await supabase
            .from('registrations')
            .select('user:profiles(id, full_name, skills, avatar_url, bio)')
            .eq('hackathon_id', hackathonId)
            .neq('user_id', userId)

        if (!data) return []

        // Client-side skill overlap scoring
        return data
            .map(r => ({
                ...r.user,
                score: r.user.skills?.filter(s => !userSkills.includes(s)).length ?? 0,
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
    },
}