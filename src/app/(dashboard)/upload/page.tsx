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

  const handleUpload = async (file: File, merchantName: string, merchantAddress: string) => {
    setIsProcessing(true);
    
    // Simulate AI verification
    const { score, signals, anomalies } = simulateVerification(file.name);
    const status = calculateStatus(score);
    
    // Get current user for attribution
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Save to DB (mock or actual Supabase)
    const record = await saveSubmission({
      merchantName,
      merchantAddress,
      documentType: file.name.toLowerCase().includes("cac") ? "CAC Certificate" : "Utility Bill",
      status, 
      score,
      signals: [...signals, ...anomalies.map(a => `Anomaly: ${a}`)],
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
