
# Synapse 🧠
 
> **Hackathons do not stop at submission.**
 
Synapse is a full-stack hackathon platform that helps participants discover events, form teams, submit projects, and receive AI-powered post-hackathon guidance — all in one place.
 
---
 
## What Synapse Does
 
Synapse brings the entire hackathon lifecycle under one roof:
 
- **Explore** — Browse hackathons by domain (AI/ML, Web Dev, Blockchain, HealthTech, and more), filter by status (Upcoming, Ongoing, Judging, Ended), and search by title, theme, or tag.
- **Team Matching** — Find teammates with complementary skills through built-in team discovery.
- **Project Submission & Judging** — Structured submission flow with an organised judging pipeline.
- **AI-Powered Post-Hackathon Reports** — After submission, Synapse generates a structured report containing a bug checklist, product roadmap, ownership plan, and commercialisation path.
- **Mentor Access** — Connect with mentors during and after the event.
---
 
## Why Synapse Is Useful
 
Most hackathon platforms stop the moment you hit "Submit." Synapse treats submission as the **starting line**, not the finish line.
 
| Problem | Synapse's Solution |
|---|---|
| Hard to find the right hackathon | Domain & status filters + full-text search |
| Teams form randomly | Complementary team matching |
| Projects die after the event | AI-generated roadmap & commercialisation path |
| No structured post-event feedback | Automated bug checklist & ownership plan |
| Scattered tools (Devpost + Slack + Notion) | Everything in one platform |
 
---
 
## Getting Started
 
### Prerequisites
 
- Node.js `v18+`
- A [Supabase](https://supabase.com) project (for the database)
### Installation
 
```bash
# 1. Clone the repository
git clone https://github.com/your-username/synapse.git
cd synapse
 
# 2. Install dependencies
npm install
 
# 3. Set up environment variables
cp .env.example .env
```
 
Fill in your `.env` file:
 
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
 
### Running Locally
 
```bash
npm run dev
```
 
Open [http://localhost:5173](http://localhost:5173) in your browser.
 
### Building for Production
 
```bash
npm run build
npm run preview
```
 
---
 
## Project Structure
 
```
synapse/
├── src/
│   ├── components/        # Shared UI components
│   ├── pages/
│   │   ├── Explore/       # Hackathon discovery page
│   │   ├── Teams/         # Team matching
│   │   └── Mentors/       # Mentor directory
│   ├── services/
│   │   └── hackathonService.js   # Supabase data layer
│   └── main.jsx
├── public/
├── .env.example
└── README.md
```
 
---
 
## Tech Stack
 
| Layer | Technology |
|---|---|
| Frontend | React, React Router, Tailwind CSS |
| Backend / DB | Supabase (PostgreSQL + Auth) |
| AI Features | Anthropic Claude API |
| Build Tool | Vite |
 

 
 

