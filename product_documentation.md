# InstaVerify-AI Product Documentation

InstaVerify-AI is a high-performance fintech compliance platform designed to streamline document verification with speed and precision. This documentation outlines the core features, administrative roles, and security protocols of the application.

## 1. User Roles & Access Control

The platform implements a strict multi-tiered administrative system to ensure data integrity and security.

### Super Administrator
The Super Admin is the primary authority on the platform, responsible for general oversight and team management.
- **Manage Admins**: Exclusively allowed to create and delete administrative accounts via the `/dashboard/admins` portal.
- **Global Data Oversight**: Can view and filter verification history from all administrators.
- **Admin Filtering**: Ability to drill down into specific admin performance and document lists.

### Administrator
Regular administrators focus on the core verification tasks.
- **Document Verification**: Verify CAC certificates and utility bills.
- **Personal Dashboard**: Access to a personalized dashboard showing only the documents they have personally verified.
- **Restricted Access**: No visibility or access to the administration management interface.

---

## 2. Authentication & Onboarding

### Secure Login
- **Password Policy**: All passwords must be at least 8 characters long for enhanced security.
- **Visibility Toggle**: A convenient icon allows users to reveal or hide their password while typing to prevent errors.

### Admin Onboarding Flow
1. **Creation**: Super Admins create new accounts with email addresses.
2. **Temporary Credentials**: New accounts are assigned a default password: `admin1234`.
3. **Mandatory Change**: Upon first login, users are automatically redirected to the **"Update Password"** screen.
4. **Validation**: The system enforces the 8-character minimum policy during the reset.
5. **Onboarding Emails**: Automated (simulated) emails are sent to new admins containing their login link and initial credentials.

---

## 3. Dashboard & Data Management

### Advanced Filtering
Super Admins can use the **Admin Filter** dropdown on the main dashboard to switch between viewing all global submissions or focusing on a specific team member's activity.

### Real-Time Verification
- **Submission History**: A detailed table of all documents processed, including status badges (Pending, Verified, Rejected).
- **Speed**: Optimized for fast data retrieval and responsive UI transitions.

---

## 4. Technical Security Features

- **Direct URL Protection**: Attempts to access unauthorized pages (e.g., `/dashboard/admins` by a regular admin) result in an automatic redirect to the dashboard.
- **Supabase Integration**: Robust authentication and data segregation powered by Supabase Auth and Row Level Security (RLS) patterns.
- **Role-Based Navigation**: The sidebar dynamically updates to show only relevant links based on the user's role metadata.
