// client/src/hooks/useHackathons.js

import { useEffect, useState } from "react";
import {
    getHackathons,
    getUpcomingHackathons,
    getMyRegistrations,
    getMyActiveHackathon,
} from "../services/hackathonService";
import { useAuth } from "../context/useAuth";

export function useHackathons(filters = {}) {
    const { status = "", search = "", organiserId = "" } = filters;

    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        let cancelled = false;

        queueMicrotask(async () => {
            setLoading(true);
            setError(null);

            const result = await getHackathons({
                status,
                search,
                organiserId,
            });

            if (cancelled) return;

            if (result.error) {
                setError(result.error);
                setHackathons([]);
                setLoading(false);
                return;
            }

            setHackathons(result.data || []);
            setLoading(false);
        });

        return () => {
            cancelled = true;
        };
    }, [status, search, organiserId, refreshKey]);

    function refetch() {
        setRefreshKey((key) => key + 1);
    }

    return {
        hackathons,
        loading,
        error,
        refetch,
    };
}

export function useUpcomingHackathons() {
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        let cancelled = false;

        queueMicrotask(async () => {
            setLoading(true);
            setError(null);

            const result = await getUpcomingHackathons();

            if (cancelled) return;

            if (result.error) {
                setError(result.error);
                setHackathons([]);
                setLoading(false);
                return;
            }

            setHackathons(result.data || []);
            setLoading(false);
        });

        return () => {
            cancelled = true;
        };
    }, [refreshKey]);

    function refetch() {
        setRefreshKey((key) => key + 1);
    }

    return {
        hackathons,
        loading,
        error,
        refetch,
    };
}

export function useMyRegistrations() {
    const { user } = useAuth();

    const [registrations, setRegistrations] = useState([]);
    const [activeHackathon, setActiveHackathon] = useState(null);
    const [loading, setLoading] = useState(Boolean(user?.id));
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        let cancelled = false;

        queueMicrotask(async () => {
            if (!user?.id) {
                setRegistrations([]);
                setActiveHackathon(null);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            const registrationsResult = await getMyRegistrations(user.id);
            const activeResult = await getMyActiveHackathon(user.id);

            if (cancelled) return;

            if (registrationsResult.error) {
                setError(registrationsResult.error);
                setRegistrations([]);
            } else {
                setRegistrations(registrationsResult.data || []);
            }

            if (!activeResult.error) {
                setActiveHackathon(activeResult.data || null);
            }

            setLoading(false);
        });

        return () => {
            cancelled = true;
        };
    }, [user?.id, refreshKey]);

    function refetch() {
        setRefreshKey((key) => key + 1);
    }

    return {
        registrations,
        activeHackathon,
        loading,
        error,
        refetch,
    };
}

export default useHackathons;