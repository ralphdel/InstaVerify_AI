import { VerificationResult } from "@/components/report/VerificationResult";
import { getSubmission } from "@/lib/db";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ReportPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const submission = await getSubmission(params.id);

  if (!submission) {
    // If it's a mock row from the dashboard table and not actually in our mock DB state (which happens on refresh)
    // We can fallback or just call notFound()
    // For MVP robustness when directly navigating from dashboard mock data:
    if (params.id.startsWith("INV-")) {
       return (
         <div className="space-y-6 max-w-4xl mx-auto">
           <div className="flex items-center gap-4 mb-8">
             <Link href="/dashboard">
               <Button variant="outline" size="icon">
                 <ArrowLeft className="h-4 w-4" />
               </Button>
             </Link>
             <div>
               <h2 className="text-2xl font-bold tracking-tight">Verification Report</h2>
               <p className="text-muted-foreground">ID: {params.id} • Sample Mock Data</p>
             </div>
           </div>
           <VerificationResult 
              status={"VERIFIED"}
              score={98}
              signals={["Seal alignment verified", "Registry match confirmed"]}
              time={"14.2 seconds"}
              details={{
                forgery_detected: false,
                name_match: true,
                registry_verified: true
              }}
            />
         </div>
       );
    }
    notFound();
  }

  const processingTime = (Math.random() * 4 + 12).toFixed(1) + " seconds";

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Verification Report</h2>
          <p className="text-muted-foreground">ID: {submission.id} • {submission.merchant_name}</p>
        </div>
      </div>

      <VerificationResult 
        status={submission.status}
        score={submission.confidence_score}
        signals={submission.signals}
        time={processingTime}
        details={submission.verification_details}
      />
    </div>
  );
}
