import { openai } from "../lib/openai.js";

const reportSchema = {
    type: "object",
    additionalProperties: false,
    properties: {
        projectSummary: { type: "string" },

        whatWorked: {
            type: "array",
            items: { type: "string" },
        },

        whatFailed: {
            type: "array",
            items: { type: "string" },
        },

        bugFixChecklist: {
            type: "array",
            items: {
                type: "object",
                additionalProperties: false,
                properties: {
                    bug: { type: "string" },
                    priority: {
                        type: "string",
                        enum: ["high", "medium", "low"],
                    },
                },
                required: ["bug", "priority"],
            },
        },

        roadmap7Day: {
            type: "array",
            items: {
                type: "object",
                additionalProperties: false,
                properties: {
                    task: { type: "string" },
                    owner: { type: "string" },
                },
                required: ["task", "owner"],
            },
        },

        roadmap30Day: {
            type: "array",
            items: {
                type: "object",
                additionalProperties: false,
                properties: {
                    task: { type: "string" },
                    goal: { type: "string" },
                },
                required: ["task", "goal"],
            },
        },

        ownershipPlan: {
            type: "array",
            items: {
                type: "object",
                additionalProperties: false,
                properties: {
                    module: { type: "string" },
                    owner: { type: "string" },
                    description: { type: "string" },
                },
                required: ["module", "owner", "description"],
            },
        },

        commercialisationPath: {
            type: "object",
            additionalProperties: false,
            properties: {
                type: {
                    type: "string",
                    enum: ["startup", "open-source", "freelance", "research"],
                },
                steps: {
                    type: "array",
                    items: { type: "string" },
                },
            },
            required: ["type", "steps"],
        },

        nextActions: {
            type: "object",
            additionalProperties: false,
            properties: {
                nextDemo: { type: "string" },
                nextFunding: { type: "string" },
                nextProduct: { type: "string" },
            },
            required: ["nextDemo", "nextFunding", "nextProduct"],
        },
    },
    required: [
        "projectSummary",
        "whatWorked",
        "whatFailed",
        "bugFixChecklist",
        "roadmap7Day",
        "roadmap30Day",
        "ownershipPlan",
        "commercialisationPath",
        "nextActions",
    ],
};

export async function generatePostHackathonReport({ submission, team }) {
    const techStack = Array.isArray(submission.tech_stack)
        ? submission.tech_stack.join(", ")
        : submission.tech_stack || "Not provided";

    const teamMembers = team?.length
        ? team.map((member) => member.full_name || member.email || "Unnamed member").join(", ")
        : "Not provided";

    const systemPrompt = `
You are a startup advisor, senior software engineer, and product mentor.

Your job is to analyze a hackathon project after submission and generate a practical continuation report.

Be specific, actionable, and realistic.
Do not give generic advice.
Assign ownership based on available team data.
Prioritize bugs by launch impact.
`;

    const userPrompt = `
Project name: ${submission.project_name}

Description:
${submission.description || "Not provided"}

Tech stack:
${techStack}

Repository:
${submission.repo_url || "Not provided"}

README:
${submission.readme_url || "Not provided"}

Team members:
${teamMembers}
`;

    const response = await openai.responses.create({
        model: "gpt-4o-mini",
        input: [
            {
                role: "system",
                content: systemPrompt,
            },
            {
                role: "user",
                content: userPrompt,
            },
        ],
        text: {
            format: {
                type: "json_schema",
                name: "post_hackathon_report",
                schema: reportSchema,
                strict: true,
            },
        },
    });

    return JSON.parse(response.output_text);
}