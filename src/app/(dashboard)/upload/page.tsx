"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadZone } from "@/components/upload/UploadZone";
import { ProcessingState } from "@/components/upload/ProcessingState";
import { calculateStatus } from "@/lib/scoreCalculator";
import { createClient } from "@/utils/supabase/client";
import { convertPdfToImage, isPdfFile } from "@/lib/pdfUtils";

export default function UploadPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [submissionData, setSubmissionData] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleUpload = async (
    rawCacFile: File | null,
    rawUtilityFile: File | null,
    merchantName: string,
    merchantAddress: string
  ) => {
    setPdfError(null);
    setIsProcessing(true);

    let verificationResult = {
      score: 50,
      forgery_detected: false,
      name_match: true,
      address_match: null as boolean | null,
      registry_verified: false,
      rc_number: null as string | null,
      rc_number_found: false,
      rc_verification_status: 'pending_api',
      signals: ['Document submitted — awaiting AI analysis'] as string[],
      ai_summary: 'Document submitted for review.',
      error_message: null as string | null,
    };

    // Step 1: Client-Side PDF to Image Conversion
    let cacFile = rawCacFile;
    let utilityFile = rawUtilityFile;

    try {
      if (isPdfFile(cacFile)) {
        verificationResult.signals = ['Converting CAC PDF to image for analysis...'];
        const cacDataUrl = await convertPdfToImage(cacFile!);
        const res = await fetch(cacDataUrl);
        const blob = await res.blob();
        cacFile = new File([blob], cacFile!.name.replace(/\.pdf$/i, '.jpg'), { type: 'image/jpeg' });
        
        // Prevent 413 Payload Too Large errors (Next.js limits bodies to ~4MB)
        if (cacFile.size > 4 * 1024 * 1024) {
          throw new Error('Converted CAC PDF is too large (exceeds 4MB limit). Please upload a lower resolution scan.');
        }
      }

      if (isPdfFile(utilityFile)) {
        verificationResult.signals = ['Converting Utility Bill PDF to image for analysis...'];
        const utilDataUrl = await convertPdfToImage(utilityFile!);
        const res = await fetch(utilDataUrl);
        const blob = await res.blob();
        utilityFile = new File([blob], utilityFile!.name.replace(/\.pdf$/i, '.jpg'), { type: 'image/jpeg' });
        
        if (utilityFile.size > 4 * 1024 * 1024) {
          throw new Error('Converted Utility PDF is too large (exceeds 4MB limit). Please upload a lower resolution scan.');
        }
      }
    } catch (err: any) {
      console.error('PDF Conversion failed:', err);
      setIsProcessing(false);
      setPdfError(err.message || 'Failed to process the PDF document. It may be corrupted or password-protected. Please upload a direct JPG/PNG image instead.');
      return;
    }

    // Step 2: Run AI Vision analysis
    try {
      const formData = new FormData();
      if (cacFile) formData.append('cacFile', cacFile);
      if (utilityFile) formData.append('utilityFile', utilityFile);
      formData.append('merchantName', merchantName);
      formData.append('merchantAddress', merchantAddress);

      const response = await fetch('/api/verify-document', {
        method: 'POST',
        body: formData,
      });

      // Safely parse JSON to prevent Vercel HTML 504 Gateway errors from crashing the app
      const rawText = await response.text();
      let aiResult;
      
      try {
        aiResult = JSON.parse(rawText);
      } catch (e) {
        console.error("Failed to parse API response as JSON. Received HTML/Text instead:", rawText.slice(0, 200));
        throw new Error("Server returned an invalid response format (likely a Vercel Timeout).");
      }

      if (!response.ok) {
        // Non-PDF error: continue with fallback signals
        verificationResult.signals = [
          `AI analysis encountered an error: ${aiResult.details || aiResult.error}`,
          'Manual review recommended',
        ];
        verificationResult.error_message = aiResult.details || aiResult.error;
      } else {
        verificationResult = {
          score: aiResult.score ?? 50,
          forgery_detected: aiResult.forgery_detected ?? false,
          name_match: aiResult.name_match ?? true,
          address_match: aiResult.address_match ?? null,
          registry_verified: aiResult.registry_verified ?? false,
          rc_number: aiResult.rc_number ?? null,
          rc_number_found: aiResult.rc_number_found ?? false,
          rc_verification_status: aiResult.rc_verification_status ?? 'pending_api',
          signals: aiResult.signals ?? ['AI analysis completed'],
          ai_summary: aiResult.ai_summary ?? 'Analysis complete.',
          error_message: aiResult.error_message ?? null,
        };

        // Add RC verification pending note for CAC submissions
        if (cacFile && verificationResult.rc_number_found) {
          verificationResult.signals.push(
            `⚠️ RC Number ${verificationResult.rc_number} — live CAC registry verification not yet implemented`
          );
        }
      }
    } catch (err) {
      console.error('Failed to call verify-document API:', err);
      verificationResult.signals = ['AI analysis unavailable — network error. Manual review required.'];
    }

    const status = calculateStatus(verificationResult.score);

    // Get current user for attribution
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Step 2: Save to DB via server-side API (bypasses RLS)
    try {
      const saveResponse = await fetch('/api/save-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantName,
          merchantAddress,
          documentType:
            cacFile && utilityFile
              ? 'Combined (CAC + Utility)'
              : cacFile
              ? 'CAC Certificate'
              : 'Utility Bill',
          status,
          score: verificationResult.score,
          signals: verificationResult.signals,
          verification_details: {
            forgery_detected: verificationResult.forgery_detected,
            name_match: verificationResult.name_match,
            address_match: verificationResult.address_match,
            registry_verified: verificationResult.registry_verified,
            rc_number: verificationResult.rc_number,
            rc_number_found: verificationResult.rc_number_found,
            rc_verification_status: verificationResult.rc_verification_status,
            error_message: verificationResult.error_message,
            ai_summary: verificationResult.ai_summary,
          },
          verified_by: user?.id,
          verified_by_email: user?.email,
        }),
      });

      const record = await saveResponse.json();
      setSubmissionData(record.id);
    } catch (err: any) {
      console.error('Failed to save submission:', err);
      // Still allow the processing state to show even if save fails, but mark it withTEMP
      setSubmissionData(`TEMP-${Date.now()}`);
    }
  };

  const handleProcessingComplete = () => {
    if (submissionData && !submissionData.startsWith('TEMP-')) {
      router.push(`/report/${submissionData}`);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Verify New Document</h2>
        <p className="text-muted-foreground mt-2">
          Upload a CAC certificate or utility bill for instant AI forensic analysis powered by GPT-4o Vision.
          <br/><span className="text-xs opacity-75">Supports PDF, JPG, and PNG files. PDFs are automatically converted.</span>
        </p>
      </div>

      {pdfError && (
        <div className="mx-auto max-w-2xl bg-destructive/10 border border-destructive/30 rounded-xl p-4 flex gap-3 text-destructive">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-semibold text-sm">Document Error</p>
            <p className="text-sm mt-1 opacity-90">{pdfError}</p>
          </div>
        </div>
      )}

      {!isProcessing ? (
        <UploadZone onUpload={handleUpload} />
      ) : (
        <ProcessingState onComplete={handleProcessingComplete} />
      )}
    </div>
  );
}
