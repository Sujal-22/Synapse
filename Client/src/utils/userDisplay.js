export function getDisplayName(profile, user) {
    return (
        profile?.full_name ||
        user?.user_metadata?.full_name ||
        profile?.username ||
        user?.user_metadata?.username ||
        "User"
    );
}

export function getUsername(profile, user) {
    const username =
        profile?.username ||
        user?.user_metadata?.username ||
        null;

    return username ? `@${username}` : "@user";
}

export function getAvatarLetter(profile, user) {
    const value =
        profile?.full_name ||
        user?.user_metadata?.full_name ||
        profile?.username ||
        user?.user_metadata?.username ||
        "User";

    return value.charAt(0).toUpperCase();
}