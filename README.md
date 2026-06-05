# LegalFlow AI — Frontend

> Next.js 15 frontend for the LegalFlow AI legal intake platform.

## Live Demo

**Application**: https://legalflow-ai.vercel.app  
**API**: https://legalflow-api.onrender.com

---

## Screenshots

### Public Intake Form

Clients submit their legal situation through a clean, validated form.
AI analyzes the submission immediately on the server.

### Staff Dashboard

Law firm staff see all cases with AI-generated priorities,
case types, and a complete metrics overview.

### Case Detail

Full AI analysis including case classification, priority,
summary, missing information, and recommended action.
Complete audit trail showing every action taken.

---

## Features

### Client Facing

- Clean intake form with real-time validation
- Character count for case description
- Confirmation screen after submission
- No account required to submit

### Staff Dashboard

- Metrics overview: total, new, high priority, closed cases
- Case table with status and priority badges
- Filter by status and priority
- Search by client name or email
- Paginated results

### Case Detail

- Full client information display
- Original submission text
- AI analysis with confidence score
- Missing information checklist
- Recommended next action
- Complete audit timeline
- Status update workflow
- Re-run AI analysis (admin only)

---

## Tech Stack

| Layer         | Technology                       |
| ------------- | -------------------------------- |
| Framework     | Next.js 15 (App Router)          |
| Language      | TypeScript (strict mode)         |
| Styling       | TailwindCSS + shadcn/ui          |
| Forms         | React Hook Form + Zod validation |
| Data Fetching | TanStack Query (React Query)     |
| HTTP Client   | Axios with interceptors          |
| Icons         | Lucide React                     |
| Toasts        | Sonner                           |
| Hosting       | Vercel                           |

---

## Local Setup

### Prerequisites

- Node.js 20 LTS
- npm 10+
- LegalFlow AI backend running

### Installation

```bash
# Clone the repository
git clone https://github.com/YOURUSERNAME/legalflow-ai-client.git
cd legalflow-ai-client

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your backend URL

# Start development server
npm run dev

Environment Variables
Bash

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api
Demo Credentials


Admin:    admin@legalflow.com  /  Admin1234!
Reviewer: sarah@legalflow.com  /  Review1234!
Application Routes
Route	Access	Description
/	Public	Client intake form
/login	Public	Staff login
/dashboard	Protected	Cases and metrics
/dashboard/cases/[id]	Protected	Case detail
Project Structure


app/
├── page.tsx                      → Public intake form
├── login/page.tsx                → Staff login
├── dashboard/
│   ├── layout.tsx                → Auth protection
│   ├── page.tsx                  → Dashboard home
│   └── cases/[id]/page.tsx       → Case detail
components/
├── forms/IntakeForm.tsx          → Client intake form
├── cases/
│   ├── CaseTable.tsx             → Cases list table
│   ├── CaseFilters.tsx           → Filter controls
│   ├── AnalysisCard.tsx          → AI analysis display
│   └── AuditTimeline.tsx         → Activity timeline
├── dashboard/MetricsCards.tsx    → Statistics cards
├── shared/
│   ├── StatusBadge.tsx           → Case status badge
│   ├── PriorityBadge.tsx         → Priority badge
│   ├── LoadingSkeleton.tsx       → Loading states
│   ├── EmptyState.tsx            → Zero data states
│   └── ErrorBoundary.tsx         → Error handling
└── layout/Navbar.tsx             → Navigation bar
hooks/
├── useCases.ts                   → Case data hooks
├── useDashboard.ts               → Metrics hook
└── useAuth.ts                    → Auth hook
providers/
├── AuthProvider.tsx              → Auth context + JWT
└── QueryProvider.tsx             → TanStack Query setup
types/index.ts                    → All TypeScript types
lib/
├── api.ts                        → Axios client
└── utils.ts                      → Helper functions
Key Engineering Decisions
Why TanStack Query?
Server state management with automatic caching, background
refetching, and cache invalidation. When a case status is updated,
both the case list and the case detail automatically refresh.

Why Zod for validation?
Runtime type validation that matches our TypeScript types.
The same schema validates both the form input and provides
TypeScript inference — no duplication.

Why Axios interceptors?
The request interceptor automatically attaches the JWT token
to every API call. The response interceptor handles 401 errors
globally — expired tokens redirect to login without any
per-page handling required.

Why separate providers?
AuthProvider and QueryProvider have different concerns.
Separating them makes each independently testable and
makes the dependency tree explicit.

Scripts
Bash

npm run dev        # Development server
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint check
Future Improvements
Feature	Description
Dark Mode	System preference detection
Document Upload	Attach files to case submissions
Email Notifications	Browser notifications for new cases
Case Assignment	Assign lawyers to specific cases
Analytics Dashboard	Case trends and resolution metrics
Mobile App	React Native intake form
Author
Yohannis Lema
GitHub https://github.com/jonny-grace
LinkedIn https://github.com/jonny-grace

```
