export const ROLES = {
    PARTICIPANT: 'participant',
    ORGANISER: 'organiser',
    JUDGE: 'judge',
    MENTOR: 'mentor',
    SPONSOR: 'sponsor',
}

export const HACKATHON_STATUS = {
    UPCOMING: 'upcoming',
    ONGOING: 'ongoing',
    JUDGING: 'judging',
    ENDED: 'ended',
}

export const ROUTES = {
    HOME: "/",

    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    VERIFY_EMAIL: "/verify-email",

    DASHBOARD: "/dashboard",
    EXPLORE: "/explore",
    HACKATHON_DETAIL: "/hackathon/:id",
    TEAMS: "/teams",
    TEAM_DETAIL: "/teams/:id",
    NOTIFICATIONS: "/notifications",
    PROFILE: "/profile",
    PROJECTS: "/projects",
    SUBMISSION: "/submission/:hackathonId",
    POST_HACKATHON: "/post-hackathon/:submissionId",
    MENTORS: "/mentors",

    ORG_DASHBOARD: "/org/dashboard",
    ORG_CREATE: "/org/create",
    ORG_MANAGE: "/org/manage/:id",
    ORG_JUDGING: "/org/judging/:id",
    ORG_ANALYTICS: "/org/analytics/:id",

    HOST_HACKATHON: "/host-hackathon",
};
export const SKILL_OPTIONS = [
    'React', 'Vue', 'Angular', 'Next.js',
    'Node.js', 'Django', 'FastAPI', 'Flask',
    'Python', 'JavaScript', 'TypeScript', 'Go', 'Rust',
    'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision',
    'UI/UX Design', 'Figma',
    'AWS', 'GCP', 'Docker', 'Kubernetes',
    'Solidity', 'Web3', 'Blockchain',
    'iOS', 'Android', 'React Native', 'Flutter',
]

export const DOMAIN_OPTIONS = [
    'AI / ML', 'Web Development', 'Mobile', 'Blockchain / Web3',
    'DevTools', 'EdTech', 'HealthTech', 'FinTech',
    'Sustainability', 'AR / VR', 'Open Source', 'Social Impact',
]

