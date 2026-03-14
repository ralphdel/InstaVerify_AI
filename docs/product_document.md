# Product Document: InstaVerify-AI

## 1. Product Vision
InstaVerify-AI is a next-generation fintech compliance platform tailored for the Nigerian market. Its primary mission is to eliminate the industry-standard 72-hour delay in business onboarding (KYB/KYC) by leveraging advanced AI Vision models to perform forensic authentication on CAC (Corporate Affairs Commission) certificates and Utility Bills in under 60 seconds.

## 2. Target Audience
- **Fintech Operators/Reviewers:** Internal compliance teams at fintech companies who need to rapidly clear merchants for payment processing.
- **Super Admins:** Compliance managers who oversee the entire verification operation and manage operator access.

## 3. Core Features
1. **Automated AI Document Forensics:** Scans uploaded documents for pixel manipulation, copy-paste overlays, and font inconsistencies to detect forgery.
2. **Data Extraction & Cross-Referencing:** 
   - Extract Registered Business Name and RC Number from CAC Certificates.
   - Extract Customer Name and Service Address from Utility Bills.
   - Cross-reference extracted data against user-provided Merchant inputs to verify identity.
3. **Operator Dashboard:** A centralized table view of all verification submissions, sortable by status (Verified, Flagged, Conditional) and confidence scores, complete with an aggregated metrics overview.
4. **Detailed Audit Reports:** Drill-down into individual verifications to view the exact forensic signals that led to the AI's decision, with options to download a PDF report or view the raw JSON data.
5. **Access Request System:** A frictionless landing page flow allowing new compliance reviewers to request platform access directly from the super admin via automated emails.

## 4. User Roles
- **Authenticated Admin (Operator):** Can upload documents, run verifications, and view their assigned history.
- **Super Admin:** Can oversee all submissions across the platform and manage the access logic for other admins.
- **Unauthenticated Visitor:** Can only view the marketing landing page and submit an access request.

## 5. Success Metrics
- **Time-to-Verify:** Reduction from 72 hours to < 60 seconds.
- **Review Accuracy:** Maintaining a low false-positive rate on flag generation through fine-tuned AI temperature settings.
