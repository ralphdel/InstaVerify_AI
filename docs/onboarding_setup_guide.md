# Onboarding & Setup Guide

Welcome to InstaVerify-AI. Follow these steps to clone, configure, and launch the development environment on a fresh machine.

## Prerequisites
- Node.js (v18.17.0 or higher)
- npm (v9.0.0 or higher)
- Git
- Access to the Supabase, OpenAI, and Resend developer portals.

## Step 1: Clone the Repository
Open your terminal and clone the source code:
```bash
git clone https://github.com/your-org/InstaVerify_AI.git
cd InstaVerify_AI
```

## Step 2: Install Dependencies
Install all required Node modules:
```bash
npm install
```

## Step 3: Configure Environment Variables
1. Duplicate the `.env.example` file (or create a new `.env.local` file in the root directory).
2. Populate it with your API keys:
```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
OPENAI_API_KEY=<your-openai-key>
RESEND_API_KEY=re_<your-resend-key>
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 4: Database Setup (Supabase)
InstaVerify-AI relies on a `submissions` table that does not exist by default in a new Supabase project.

1. Navigate to your Supabase Dashboard -> SQL Editor.
2. Run the following DDL script:
```sql
CREATE TABLE IF NOT EXISTS public.submissions (
  id TEXT PRIMARY KEY,
  merchant_name TEXT NOT NULL,
  merchant_address TEXT,
  document_type TEXT NOT NULL,
  status TEXT NOT NULL,
  confidence_score INTEGER,
  signals JSONB,
  upload_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_by UUID REFERENCES auth.users(id),
  verified_by_email TEXT,
  verification_details JSONB
);

-- Enable RLS for security
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Allow logged-in operators to view history
CREATE POLICY "Admins can view all submissions" ON public.submissions
  FOR SELECT USING (auth.role() = 'authenticated');
```

## Step 5: Start the Development Server
Run the local Next.js server:
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`. 
- **Landing Page:** You should see the split-pane Navy application.
- **Login:** Use the credentials you set up within Supabase Authentication to access the `/dashboard`.
