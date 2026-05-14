import { useEffect, useState } from "react";
import {
    getNotifications,
    getUnreadNotificationCount,
    markAllNotificationsRead,
    markNotificationRead,
    subscribeToNotifications,
} from "../services/notificationService";
import { useAuth } from "../context/useAuth";

export default function useNotifications() {
    const { user } = useAuth();

    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(Boolean(user?.id));
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        let channel = null;

        queueMicrotask(async () => {
            if (!user?.id) {
                if (!cancelled) {
                    setNotifications([]);
                    setUnreadCount(0);
                    setLoading(false);
                    setError(null);
                }
                return;
            }

            setLoading(true);
            setError(null);

            const notificationsResult = await getNotifications(user.id);
            const unreadResult = await getUnreadNotificationCount(user.id);

            if (cancelled) return;

            if (notificationsResult.error) {
                setError(notificationsResult.error);
                setNotifications([]);
            } else {
                setNotifications(notificationsResult.data || []);
            }

            if (!unreadResult.error) {
                setUnreadCount(unreadResult.data || 0);
            }

            setLoading(false);

            channel = subscribeToNotifications(user.id, (payload) => {
                const newNotification = payload.new;

                setNotifications((prev) => [newNotification, ...prev]);
                setUnreadCount((prev) => prev + 1);
            });
        });

        return () => {
            cancelled = true;

            if (channel) {
                channel.unsubscribe();
            }
        };
    }, [user?.id, refreshKey]);

    async function refetch() {
        setRefreshKey((key) => key + 1);
    }

    async function markRead(notificationId) {
        if (!notificationId) {
            return {
                data: null,
                error: "Notification ID is required.",
            };
        }

        const result = await markNotificationRead(notificationId);

        if (!result.error) {
            setNotifications((prev) =>
                prev.map((item) =>
                    item.id === notificationId ? { ...item, read: true } : item,
                ),
            );

            setUnreadCount((prev) => Math.max(prev - 1, 0));
        }

        return result;
    }

    async function markAllRead() {
        if (!user?.id) {
            return {
                data: null,
                error: "User ID is required.",
            };
        }

        const result = await markAllNotificationsRead(user.id);

        if (!result.error) {
            setNotifications((prev) =>
                prev.map((item) => ({
                    ...item,
                    read: true,
                })),
            );

            setUnreadCount(0);
        }

        return result;
    }

    return {
        notifications,
        unreadCount,
        loading,
        error,
        refetch,
        markRead,
        markAllRead,
    };
}