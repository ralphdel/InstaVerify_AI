# Technology Stack Document

InstaVerify-AI is built using an opinionated, modern TS/React stack designed for Vercel deployment.

## Frontend
- **Framework:** Next.js 15 (App Router)
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS V4
- **Components:** Shadcn UI (Radix UI primitives)
- **Icons:** Lucide-React

## Backend
- **Framework:** Next.js API Routes (Node.js Edge / Serverless)
- **Database:** PostgreSQL (Supabase)
- **Auth:** Supabase Auth (GoTrue)
- **File Parsing:** Standard Web File API / Node Buffers to Base64
- **Analytics:** Vercel Analytics (Optional)

## Artificial Intelligence
- **Model:** OpenAI `gpt-4o` (GPT-4 Vision)
- **Integration:** Official `openai` npm package
- **Prompting Strategy:** Structured JSON enforcement with deterministic Markdown removal.

## Communications
- **Email Delivery:** Resend (`resend` npm package)
- **Fallback:** Native `console.log` interception during API key absence.
