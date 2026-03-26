# Software Architecture Document

## 1. High-Level Architecture
InstaVerify-AI is a modern monolithic web application utilizing a **Serverless Full-Stack Architecture** driven by **Next.js 15 (App Router)**.

- **Frontend (Client Layer):** React 19 components executed on the edge or client browser. Handles UI interactivity, form submissions, real-time feedback (loaders, toast notifications), and responsive layout rendering.
- **Backend (Server Layer):** Next.js API Routes (`/api/*`) executing in Node.js serverless functions. Handles secure operations like interacting with OpenAI, querying Supabase, and sending emails via Resend.
- **Database (Persistence Layer):** Supabase (PostgreSQL) handling both user authentication (GoTrue) and relational data storage with Row Level Security (RLS).
- **AI Processing (Intelligence Layer):** Dual-pipeline forensic processing engine running Gemini 2.5 Flash as primary and OpenAI GPT-4o Vision as fallback.

## 2. Component Diagram

```mermaid
graph TD
    Client[Browser / Client Components] -->|HTTP POST Form Data| APIUpload[/api/verify-document/]
    Client -->|HTTP GET/POST| APIDB[/api/submissions/...]
    
    APIUpload -->|Base64 Images + Prompt| AI[Google Gemini / OpenAI Fallback]
    AI -.->|JSON Verdict| APIUpload
    
    APIUpload -->|HTTP POST Insert| Supabase[(Supabase PostgreSQL)]
    APIDB -->|Auth'd Select| Supabase
    
    Supabase -.->|Verification Report| Client
```

## 3. Server vs Client Components (RSC)
The architecture heavily relies on React Server Components (RSC) to minimize JavaScript payload and execute direct database queries:
- **Server Components:** `layout.tsx`, `page.tsx` (Dashboard), `Sidebar.tsx`, `Header.tsx`. These fetch data directly via `@/utils/supabase/server` before rendering HTML to the client.
- **Client Components:** Tagged with `'use client'`. Used for interactive states. E.g., `UploadZone.tsx`, `LoginForm.tsx`, `DashboardTable.tsx`.

## 4. Authentication Architecture
InstaVerify-AI uses **Supabase Auth** with server-side cookie management.
1. The user inputs credentials via `LoginForm.tsx`.
2. A server action in `actions.ts` calls `supabase.auth.signInWithPassword`.
3. Supabase issues a session standard JWT, which is set in a secure HTTP-only cookie.
4. Next.js Middleware (`src/middleware.ts`) intercepts every edge request, validates the cookie, and restricts unauthenticated users from accessing `/dashboard` or `/upload`.

## 5. Third-Party Integrations
- **AI Engines:** Both Gemini and OpenAI are used strictly server-side to prevent API key exposure. File buffers are converted to Base64 in standard Node arrays before transmission.
- **Resend:** Used to dispatch emails asynchronously for access requests.
