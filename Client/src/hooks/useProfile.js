import { useAuth } from "../context/useAuth";

export default function useProfile() {
    const {
        user,
        profile,
        loading,
        updateProfile,
        fetchProfile,
    } = useAuth();

    const role = profile?.role || "participant";

    return {
        user,
        profile,
        loading,
        role,

        isLoggedIn: Boolean(user),
        isParticipant: role === "participant",
        isOrganiser: role === "organiser",
        isJudge: role === "judge",
        isMentor: role === "mentor",
        isSponsor: role === "sponsor",

        updateProfile,
        refreshProfile: () => {
            if (!user?.id) return null;
            return fetchProfile(user.id);
        },
    };
}