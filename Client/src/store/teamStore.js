import { create } from "zustand";
import {
    getTeamsByHackathon,
    getSuggestions,
    createTeam,
    joinTeam,
    leaveTeam,
    getMyTeamForHackathon,
    getTeamMembers,
} from "../services/teamService";

export const useTeamStore = create((set, get) => ({
    teams: [],
    suggestions: [],
    myTeam: null,
    teamMembers: [],

    loading: false,
    error: null,

    loadTeamsByHackathon: async (hackathonId) => {
        set({ loading: true, error: null });

        const { data, error } = await getTeamsByHackathon(hackathonId);

        if (error) {
            set({
                teams: [],
                loading: false,
                error,
            });

            return { data: [], error };
        }

        set({
            teams: data || [],
            loading: false,
            error: null,
        });

        return { data, error: null };
    },

    loadSuggestions: async (hackathonId, userId, userSkills = []) => {
        set({ loading: true, error: null });

        const { data, error } = await getSuggestions(
            hackathonId,
            userId,
            userSkills,
        );

        if (error) {
            set({
                suggestions: [],
                loading: false,
                error,
            });

            return { data: [], error };
        }

        set({
            suggestions: data || [],
            loading: false,
            error: null,
        });

        return { data, error: null };
    },

    createNewTeam: async (payload) => {
        set({ loading: true, error: null });

        const { data, error } = await createTeam(payload);

        if (error) {
            set({
                loading: false,
                error,
            });

            return { data: null, error };
        }

        set((state) => ({
            teams: [data, ...state.teams],
            myTeam: data,
            loading: false,
            error: null,
        }));

        return { data, error: null };
    },

    joinExistingTeam: async (teamId, userId) => {
        set({ loading: true, error: null });

        const { data, error } = await joinTeam(teamId, userId);

        if (error) {
            set({
                loading: false,
                error,
            });

            return { data: null, error };
        }

        set({
            loading: false,
            error: null,
        });

        return { data, error: null };
    },

    leaveExistingTeam: async (teamId, userId) => {
        set({ loading: true, error: null });

        const { data, error } = await leaveTeam(teamId, userId);

        if (error) {
            set({
                loading: false,
                error,
            });

            return { data: null, error };
        }

        set({
            myTeam: null,
            loading: false,
            error: null,
        });

        return { data, error: null };
    },

    loadMyTeam: async (hackathonId, userId) => {
        set({ loading: true, error: null });

        const { data, error } = await getMyTeamForHackathon(hackathonId, userId);

        if (error) {
            set({
                myTeam: null,
                loading: false,
                error,
            });

            return { data: null, error };
        }

        set({
            myTeam: data?.teams || data || null,
            loading: false,
            error: null,
        });

        return { data, error: null };
    },

    loadTeamMembers: async (teamId) => {
        set({ loading: true, error: null });

        const { data, error } = await getTeamMembers(teamId);

        if (error) {
            set({
                teamMembers: [],
                loading: false,
                error,
            });

            return { data: [], error };
        }

        set({
            teamMembers: data || [],
            loading: false,
            error: null,
        });

        return { data, error: null };
    },

    clearTeamState: () =>
        set({
            teams: [],
            suggestions: [],
            myTeam: null,
            teamMembers: [],
            loading: false,
            error: null,
        }),
}));