# Dependency Management Document

The application dependencies are managed via npm. Below is the audited breakdown of the `package.json` environment as of v0.1.0.

## Core Dependencies (`dependencies`)

| Package | Purpose |
| :--- | :--- |
| `next` | React meta-framework handling routing, SSR, and API endpoints. |
| `react` & `react-dom` | UI component library. |
| `@supabase/ssr` | Secure cookie-based authentication hooks for Next.js Server Components. |
| `@supabase/supabase-js` | The Supabase Javascript Client SDK for database operations. |
| `openai` | Official OpenAI SDK for interfacing with the external GPT-4o Vision API endpoint. |
| `resend` | Node SDK for sending transactional emails (Access Requests). |
| `lucide-react` | Scalable SVG icon library. |
| `clsx` & `tailwind-merge` | Utility libraries for dynamically constructing Tailwind classes without layout collisions. |

## Development Dependencies (`devDependencies`)

| Package | Purpose |
| :--- | :--- |
| `typescript` | Static typing enforcement. |
| `@types/react` | Type definitions for React. |
| `@types/node` | Type definitions for Node.js APIs (Buffers, fs). |
| `tailwindcss` | Utility-first CSS framework engine. |
| `postcss` | CSS transformation engine required by Tailwind. |
| `eslint` & `eslint-config-next` | Code quality and linting strictly enforcing Next.js best practices securely. |

*To update dependencies securely, regularly run `npm audit` and `npm update`.*
