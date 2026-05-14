// client/src/store/hackathonStore.js

import { create } from "zustand";
import {
    getHackathons,
    getUpcomingHackathons,
    getHackathonById,
    getMyRegistrations,
    getMyActiveHackathon,
    registerForHackathon,
    checkRegistration,
    unregisterFromHackathon,
} from "../services/hackathonService";

export const useHackathonStore = create((set, get) => ({
    hackathons: [],
    upcomingHackathons: [],
    selectedHackathon: null,
    myRegistrations: [],
    activeHackathon: null,
    isRegistered: false,

    loading: false,
    error: null,

    setSelectedHackathon: (hackathon) =>
        set({
            selectedHackathon: hackathon,
        }),

    clearSelectedHackathon: () =>
        set({
            selectedHackathon: null,
            isRegistered: false,
        }),

    loadHackathons: async (filters = {}) => {
        set({ loading: true, error: null });

        const { data, error } = await getHackathons(filters);

        if (error) {
            set({
                hackathons: [],
                loading: false,
                error,
            });

            return { data: [], error };
        }

        set({
            hackathons: data || [],
            loading: false,
            error: null,
        });

        return { data, error: null };
    },

    loadUpcomingHackathons: async () => {
        set({ loading: true, error: null });

        const { data, error } = await getUpcomingHackathons();

        if (error) {
            set({
                upcomingHackathons: [],
                loading: false,
                error,
            });

            return { data: [], error };
        }

        set({
            upcomingHackathons: data || [],
            loading: false,
            error: null,
        });

        return { data, error: null };
    },

    loadHackathonById: async (hackathonId) => {
        set({ loading: true, error: null });

        const { data, error } = await getHackathonById(hackathonId);

        if (error) {
            set({
                selectedHackathon: null,
                loading: false,
                error,
            });

            return { data: null, error };
        }

        set({
            selectedHackathon: data,
            loading: false,
            error: null,
        });

        return { data, error: null };
    },

    loadMyRegistrations: async (userId) => {
        if (!userId) {
            return {
                data: [],
                error: "User ID is required.",
            };
        }

        set({ loading: true, error: null });

        const { data, error } = await getMyRegistrations(userId);

        if (error) {
            set({
                myRegistrations: [],
                loading: false,
                error,
            });

            return { data: [], error };
        }

        set({
            myRegistrations: data || [],
            loading: false,
            error: null,
        });

        return { data, error: null };
    },

    loadMyActiveHackathon: async (userId) => {
        if (!userId) {
            return {
                data: null,
                error: "User ID is required.",
            };
        }

        const { data, error } = await getMyActiveHackathon(userId);

        if (error) {
            set({
                activeHackathon: null,
                error,
            });

            return { data: null, error };
        }

        set({
            activeHackathon: data || null,
            error: null,
        });

        return { data, error: null };
    },

    registerUserForHackathon: async (hackathonId, userId) => {
        set({ loading: true, error: null });

        const { data, error } = await registerForHackathon(hackathonId, userId);

        if (error) {
            set({
                loading: false,
                error,
            });

            return { data: null, error };
        }

        set({
            isRegistered: true,
            loading: false,
            error: null,
        });

        await get().loadMyRegistrations(userId);

        return { data, error: null };
    },

    checkUserRegistration: async (hackathonId, userId) => {
        const { data, error } = await checkRegistration(hackathonId, userId);

        if (error) {
            set({
                isRegistered: false,
                error,
            });

            return { data: false, error };
        }

        set({
            isRegistered: Boolean(data),
            error: null,
        });

        return { data: Boolean(data), error: null };
    },

    unregisterUserFromHackathon: async (hackathonId, userId) => {
        set({ loading: true, error: null });

        const { data, error } = await unregisterFromHackathon(hackathonId, userId);

        if (error) {
            set({
                loading: false,
                error,
            });

            return { data: null, error };
        }

        set({
            isRegistered: false,
            loading: false,
            error: null,
        });

        await get().loadMyRegistrations(userId);

        return { data, error: null };
    },
}));