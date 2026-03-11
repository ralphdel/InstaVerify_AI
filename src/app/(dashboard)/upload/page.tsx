"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadZone } from "@/components/upload/UploadZone";
import { ProcessingState } from "@/components/upload/ProcessingState";
import { simulateVerification } from "@/lib/verificationEngine";
import { calculateStatus } from "@/lib/scoreCalculator";
import { saveSubmission } from "@/lib/db";
import { createClient } from "@/utils/supabase/client";

export default function UploadPage() {

  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [submissionData, setSubmissionData] = useState<string | null>(null);

  const handleUpload = async (cacFile: File | null, utilityFile: File | null, merchantName: string, merchantAddress: string) => {
    setIsProcessing(true);
    
    // Comprehensive Verification Logic
    const verificationResults = await simulateVerification({
      cacFile: cacFile?.name || null,
      utilityFile: utilityFile?.name || null,
      merchantName,
      merchantAddress
    });

    const status = calculateStatus(verificationResults.score);
    
    // Get current user for attribution
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Save to DB with enhanced metadata
    const record = await saveSubmission({
      merchantName,
      merchantAddress,
      documentType: cacFile && utilityFile ? "Combined (CAC + Utility)" : cacFile ? "CAC Certificate" : "Utility Bill",
      status, 
      score: verificationResults.score,
      signals: verificationResults.signals,
      verification_details: verificationResults.details, // Stores granular check results
      verified_by: user?.id,
      verified_by_email: user?.email
    });

    setSubmissionData(record.id);
  };

  const handleProcessingComplete = () => {
    if (submissionData) {
      router.push(`/report/${submissionData}`);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Verify New Document</h2>
        <p className="text-muted-foreground mt-2">Upload a CAC certificate or utility bill for instant AI analysis.</p>
      </div>

      {!isProcessing ? (
        <UploadZone onUpload={handleUpload} />
      ) : (
        <ProcessingState onComplete={handleProcessingComplete} />
      )}
    </div>
  );
}
