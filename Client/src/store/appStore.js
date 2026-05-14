// client/src/store/appStore.js

import { create } from "zustand";

export const useAppStore = create((set) => ({
    // UI state
    sidebarOpen: false,
    bottomNavVisible: true,
    activeHackathonId: null,

    // Notifications
    unreadCount: 0,

    // Toast
    toast: null,

    // Modal
    modal: {
        open: false,
        type: null,
        data: null,
    },

    openSidebar: () => set({ sidebarOpen: true }),

    closeSidebar: () => set({ sidebarOpen: false }),

    toggleSidebar: () =>
        set((state) => ({
            sidebarOpen: !state.sidebarOpen,
        })),

    showBottomNav: () => set({ bottomNavVisible: true }),

    hideBottomNav: () => set({ bottomNavVisible: false }),

    setActiveHackathonId: (hackathonId) =>
        set({
            activeHackathonId: hackathonId,
        }),

    setUnreadCount: (count) =>
        set({
            unreadCount: count,
        }),

    incrementUnreadCount: () =>
        set((state) => ({
            unreadCount: state.unreadCount + 1,
        })),

    clearUnreadCount: () =>
        set({
            unreadCount: 0,
        }),

    showToast: ({ type = "info", message = "" }) =>
        set({
            toast: {
                type,
                message,
            },
        }),

    clearToast: () =>
        set({
            toast: null,
        }),

    openModal: ({ type, data = null }) =>
        set({
            modal: {
                open: true,
                type,
                data,
            },
        }),

    closeModal: () =>
        set({
            modal: {
                open: false,
                type: null,
                data: null,
            },
        }),
}));