import { VerificationStatus } from "@/components/report/VerificationResult";

export function calculateStatus(score: number): VerificationStatus {
  if (score >= 80) return "VERIFIED";
  if (score >= 60) return "CONDITIONAL APPROVAL";
  return "FLAGGED";
}
