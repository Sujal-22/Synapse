// client/src/store/notificationStore.js

import { create } from "zustand";
import {
    getNotifications,
    getUnreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead,
    subscribeToNotifications,
} from "../services/notificationService";

export const useNotificationStore = create((set, get) => ({
    notifications: [],
    unreadCount: 0,
    subscription: null,

    loading: false,
    error: null,

    loadNotifications: async (userId) => {
        if (!userId) {
            return {
                data: [],
                error: "User ID is required.",
            };
        }

        set({ loading: true, error: null });

        const { data, error } = await getNotifications(userId);

        if (error) {
            set({
                notifications: [],
                loading: false,
                error,
            });

            return { data: [], error };
        }

        set({
            notifications: data || [],
            loading: false,
            error: null,
        });

        return { data, error: null };
    },

    loadUnreadCount: async (userId) => {
        if (!userId) {
            return {
                data: 0,
                error: "User ID is required.",
            };
        }

        const { data, error } = await getUnreadNotificationCount(userId);

        if (error) {
            set({
                unreadCount: 0,
                error,
            });

            return { data: 0, error };
        }

        set({
            unreadCount: data || 0,
            error: null,
        });

        return { data, error: null };
    },

    markAsRead: async (notificationId) => {
        const { data, error } = await markNotificationRead(notificationId);

        if (error) {
            set({ error });
            return { data: null, error };
        }

        set((state) => ({
            notifications: state.notifications.map((item) =>
                item.id === notificationId ? { ...item, read: true } : item,
            ),
            unreadCount: Math.max(state.unreadCount - 1, 0),
            error: null,
        }));

        return { data, error: null };
    },

    markAllAsRead: async (userId) => {
        if (!userId) {
            return {
                data: null,
                error: "User ID is required.",
            };
        }

        const { data, error } = await markAllNotificationsRead(userId);

        if (error) {
            set({ error });
            return { data: null, error };
        }

        set((state) => ({
            notifications: state.notifications.map((item) => ({
                ...item,
                read: true,
            })),
            unreadCount: 0,
            error: null,
        }));

        return { data, error: null };
    },

    startRealtimeNotifications: (userId) => {
        if (!userId) return null;

        const existingSubscription = get().subscription;

        if (existingSubscription) {
            existingSubscription.unsubscribe();
        }

        const channel = subscribeToNotifications(userId, (payload) => {
            const newNotification = payload.new;

            set((state) => ({
                notifications: [newNotification, ...state.notifications],
                unreadCount: state.unreadCount + 1,
            }));
        });

        set({
            subscription: channel,
        });

        return channel;
    },

    stopRealtimeNotifications: () => {
        const subscription = get().subscription;

        if (subscription) {
            subscription.unsubscribe();
        }

        set({
            subscription: null,
        });
    },

    clearNotifications: () =>
        set({
            notifications: [],
            unreadCount: 0,
            error: null,
        }),
}));