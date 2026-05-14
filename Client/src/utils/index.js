export function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

export function getAuthError(message = "") {
    const msg = message.toLowerCase();

    if (msg.includes("invalid login")) return "Invalid email or password.";
    if (msg.includes("email not confirmed")) return "Please verify your email before logging in.";
    if (msg.includes("already registered")) return "This email is already registered.";
    if (msg.includes("password")) return "Password does not meet the required format.";
    if (msg.includes("network")) return "Network error. Please try again.";

    return message || "Something went wrong. Please try again.";
}