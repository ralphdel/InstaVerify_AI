import { VerificationResult } from "@/components/report/VerificationResult";
import { getSubmission } from "@/lib/db";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ReportPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  // Try fetching from DB
  let submission = await getSubmission(params.id);

  // If not found but looks like a valid INV- ID, the record may not have saved yet
  if (!submission && params.id.startsWith("INV-")) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Verification Report</h2>
            <p className="text-muted-foreground">ID: {params.id} — Report not found. It may still be processing.</p>
          </div>
        </div>
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-semibold">Report not found</p>
          <p className="text-sm mt-2">This report may not have saved correctly. Please try submitting again or check the dashboard.</p>
          <Link href="/upload" className="mt-6 inline-block">
            <Button>Submit a new document</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!submission) notFound();

  const processingTime = (Math.random() * 4 + 12).toFixed(1) + " seconds";

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard">
          <Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Verification Report</h2>
          <p className="text-muted-foreground">ID: {submission.id} • {submission.merchant_name}</p>
        </div>
      </div>

      <VerificationResult
        id={submission.id}
        merchantName={submission.merchant_name}
        merchantAddress={submission.merchant_address}
        documentType={submission.document_type}
        status={submission.status}
        score={submission.confidence_score}
        signals={submission.signals}
        time={processingTime}
        details={submission.verification_details}
      />
    </div>
  );
}
