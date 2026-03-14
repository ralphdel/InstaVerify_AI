# Technical Design Document

## 1. AI Verification Engine (`/api/verify-document`)
The core functionality resides in the route handler that processes multipart/form-data.

### Forensic Prompt Generation
The system dynamically constructs the `system` prompt based on the file types submitted:
- **If CAC:** The model is instructed to extract the RC/BN number, perform an exact business name match, and execute visual forgery checks. It is strictly told *not* to verify the address (reserved for future registry API integration).
- **If Utility:** The model is instructed to match both the name and the exact billing address against user input, alongside forgery detection.

### Fallback/Mock System
To ensure the MVP remains functional when OpenAI billing quotas (HTTP 429) are hit, a deterministic fallback simulator intercepts the catch block. It generates a mock JSON payload that structurally identically matches the AI output, randomly deciding between a "Success" and "Flagged" state, allowing UI testing to continue unimpeded.

## 2. API Data Flow (Database)
Instead of processing database queries inside the AI route (which could time out), the application separates concerns:
1. `POST /api/verify-document` executes the AI analysis and returns the volatile JSON result.
2. The client receives the JSON, prepares it, and sends it to `POST /api/save-submission`.
3. The save-submission route inserts the record into Supabase using a service role key.
4. The client redirects to `/report/[id]`, which performs a Server-Side Render (SSR) database fetch authenticated as the user, bypassing the Row Level Security (RLS) constraints.

## 3. Responsive UI System
The visual layer is built using **Tailwind CSS** and **Shadcn UI** components.
### Breakpoint Strategy
- `default`: Mobile-first styling. The dashboard sidebar is hidden, navigation uses a bottom fixed tab bar (`MobileNav.tsx`), padding is tight, and data tables use `overflow-x-auto`.
- `sm` (640px+): Component padding increases to standard dimensions.
- `md` (768px+): Desktop layout takes over. The `AppLayout` adds `md:pl-64` to vacate space for the permanently fixed vertical `<Sidebar>`, and the top header expands its minimum widths.
- `lg` (1024px+): The landing page switches from stacked blocks to a 50/50 CSS Flexbox split-screen `flex-row`.

## 4. Error Handling
- Verification logic wrapped in robust `try/catch` with specialized typing for Supabase PostgREST errors.
- Client components utilize local state `Error` boundaries to display inline red warnings (e.g., Lucide `AlertTriangle`) instead of crashing the React tree.
