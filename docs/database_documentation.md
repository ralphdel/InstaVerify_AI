# Database Documentation

InstaVerify-AI relies on Supabase, an open-source PostgreSQL database.

## 1. Schema Overview

### Table: `public.submissions`
This table acts as the ledger for every document verification attempt.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `TEXT` | `PRIMARY KEY` | Custom generated `sub_xxxxx` unique ID. |
| `merchant_name` | `TEXT` | `NOT NULL` | The business name provided by the operator. |
| `merchant_address` | `TEXT` | `NULL` | The address provided by the operator. |
| `document_type` | `TEXT` | `NOT NULL` | e.g., "CAC Dashboard", "Utility Bill". |
| `status` | `TEXT` | `NOT NULL` | Enum: `VERIFIED`, `FLAGGED`, `CONDITIONAL APPROVAL`. |
| `confidence_score` | `INTEGER` | `NULL` | 0-100 representation of AI certainty. |
| `signals` | `JSONB` | `NULL` | Array of strings containing AI justification. |
| `upload_time` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Timestamp of the transaction. |
| `verified_by` | `UUID` | `FK -> auth.users.id` | The operator who ran the check. |
| `verified_by_email` | `TEXT` | `NULL` | Cached email for faster dashboard rendering. |
| `verification_details` | `JSONB` | `NULL` | Complete raw JSON breakdown from Dual-Pipeline AI engine. |

### Table: `auth.users`
Managed entirely by Supabase GoTrue. Stores operator emails, encrypted passwords, and RBAC (Role Based Access Control) in the `raw_user_meta_data` JSONB column (e.g., `{"role": "super_admin"}`).

## 2. Row Level Security (RLS)
The `submissions` table has Row Level Security enabled to ensure data privacy.

**Policy 1: Allow Admins to View Submissions**
```sql
CREATE POLICY "Admins can view all submissions" ON public.submissions
  FOR SELECT USING (auth.role() = 'authenticated');
```
*Note:* Reads initiated from the frontend *must* use `createClient()` from `@/utils/supabase/server` so the authenticated JWT is passed. Anonymous clients will yield zero rows.

**Policy 2: Service Role Insert**
Insertions happen through the Next.js API route using the `SUPABASE_SERVICE_ROLE_KEY`. This key bypasses RLS rules, allowing the application acting on behalf of the user to safely write records without exposing write privileges to the public schema.
