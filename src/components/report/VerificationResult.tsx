"use client";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2, AlertTriangle, XCircle, Download, ShieldCheck, FileCheck, Clock
} from "lucide-react";

export type VerificationStatus = "VERIFIED" | "CONDITIONAL APPROVAL" | "FLAGGED";

interface VerificationResultProps {
  id?: string;
  merchantName?: string;
  merchantAddress?: string;
  documentType?: string;
  status: VerificationStatus;
  score: number;
  signals: string[];
  time: string;
  details?: {
    forgery_detected: boolean;
    name_match: boolean;
    address_match?: boolean | null;
    registry_verified: boolean;
    rc_number?: string | null;
    rc_number_found?: boolean;
    rc_verification_status?: string;
    error_message?: string | null;
    ai_summary?: string;
  };
}

export function VerificationResult({
  id, merchantName, merchantAddress, documentType,
  status, score, signals, time, details
}: VerificationResultProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const isVerified = status === "VERIFIED";
  const isFlagged = status === "FLAGGED";
  const isConditional = status === "CONDITIONAL APPROVAL";
  const isUtility = documentType?.toLowerCase().includes('utility');
  const isCac = documentType?.toLowerCase().includes('cac');

  // Download as PDF via browser print dialog
  const handleDownloadPdf = () => {
    const content = printRef.current?.innerHTML || '';
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>InstaVerify-AI Audit Report — ${id || 'N/A'}</title>
          <style>
            body { font-family: 'Arial', sans-serif; margin: 40px; color: #111; }
            h1 { font-size: 22px; color: #0f172a; border-bottom: 2px solid #0f172a; padding-bottom: 8px; }
            h2 { font-size: 16px; margin-top: 20px; }
            .meta { color: #64748b; font-size: 14px; margin-bottom: 20px; }
            .score { font-size: 48px; font-weight: 900; }
            .score.good { color: #16a34a; }
            .score.warn { color: #d97706; }
            .score.bad { color: #dc2626; }
            .badge { display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 700; margin-left: 8px; }
            .verified { background: #dcfce7; color: #16a34a; }
            .flagged { background: #fee2e2; color: #dc2626; }
            .conditional { background: #fef9c3; color: #854d0e; }
            .checks { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 20px 0; }
            .check-box { border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; }
            .check-label { font-size: 10px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 4px; }
            .check-val { font-size: 13px; font-weight: 700; }
            .green { color: #16a34a; } .red { color: #dc2626; } .amber { color: #d97706; } .gray { color: #64748b; }
            .signals { list-style: none; padding: 0; }
            .signals li { padding: 8px 12px; margin-bottom: 6px; border-radius: 6px; font-size: 13px; background: #f8fafc; border: 1px solid #e2e8f0; }
            .summary { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px 16px; border-radius: 4px; font-size: 14px; margin: 16px 0; }
            .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 4px; font-size: 14px; margin: 16px 0; }
            .footer { margin-top: 40px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px; }
          </style>
        </head>
        <body>
          <h1>InstaVerify-AI — Audit Report</h1>
          <div class="meta">
            <strong>Report ID:</strong> ${id || 'N/A'} &nbsp;|&nbsp;
            <strong>Document Type:</strong> ${documentType || 'N/A'} &nbsp;|&nbsp;
            <strong>Business Name:</strong> ${merchantName || 'N/A'} &nbsp;|&nbsp;
            <strong>Address:</strong> ${merchantAddress || 'N/A'} &nbsp;|&nbsp;
            <strong>Generated:</strong> ${new Date().toLocaleString()}
          </div>
          <div>
            <span class="score ${score >= 80 ? 'good' : score >= 50 ? 'warn' : 'bad'}">${score}%</span>
            <span class="badge ${isVerified ? 'verified' : isFlagged ? 'flagged' : 'conditional'}">${status}</span>
          </div>
          <div class="checks">
            <div class="check-box">
              <div class="check-label">Scan Integrity</div>
              <div class="check-val ${details?.forgery_detected ? 'red' : 'green'}">${details?.forgery_detected ? 'Forgery Detected' : 'Original'}</div>
            </div>
            <div class="check-box">
              <div class="check-label">Identity Match</div>
              <div class="check-val ${details?.name_match ? 'green' : 'amber'}">${details?.name_match ? 'Matched' : 'Mismatch'}</div>
            </div>
            ${details?.address_match !== null && details?.address_match !== undefined ? `<div class="check-box">
              <div class="check-label">Address Match</div>
              <div class="check-val ${details.address_match ? 'green' : 'amber'}">${details.address_match ? 'Confirmed' : 'Mismatch'}</div>
            </div>` : ''}
            <div class="check-box">
              <div class="check-label">Registry Status</div>
              <div class="check-val ${details?.registry_verified ? 'green' : 'gray'}">${details?.registry_verified ? 'Confirmed' : 'Unverified'}</div>
            </div>
            ${details?.rc_number ? `<div class="check-box">
              <div class="check-label">RC Number</div>
              <div class="check-val amber">${details.rc_number} (API pending)</div>
            </div>` : ''}
          </div>
          ${details?.ai_summary ? `<div class="summary"><strong>AI Analysis:</strong> ${details.ai_summary}</div>` : ''}
          ${details?.error_message ? `<div class="warning"><strong>⚠️ Warning:</strong> ${details.error_message}</div>` : ''}
          <h2>Detected Signals</h2>
          <ul class="signals">${signals.map(s => `<li>${s}</li>`).join('')}</ul>
          <div class="footer">Generated by InstaVerify-AI &nbsp;|&nbsp; AI-Powered Document Verification &nbsp;|&nbsp; This report is for informational purposes only.</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };

  const rawData = {
    report_id: id,
    merchant_name: merchantName,
    merchant_address: merchantAddress,
    document_type: documentType,
    status,
    confidence_score: score,
    analysis_time: time,
    verification_details: details,
    signals,
    generated_at: new Date().toISOString(),
  };

  return (
    <>
      <Card className="max-w-3xl mx-auto border-border shadow-sm" ref={printRef}>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-0 pb-8 border-b border-border">
          <div className="flex-1">
            <CardTitle className="text-2xl font-bold flex flex-wrap items-center gap-2">
              Verification Result
              {isVerified && <Badge className="bg-success hover:bg-success/90 text-success-foreground border-transparent">VERIFIED</Badge>}
              {isConditional && <Badge className="bg-warning hover:bg-warning/90 text-warning-foreground border-transparent">CONDITIONAL</Badge>}
              {isFlagged && <Badge className="bg-destructive hover:bg-destructive/90 text-destructive-foreground border-transparent">FLAGGED</Badge>}
            </CardTitle>
            <CardDescription className="mt-2 text-base flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              {documentType && <span className="mr-3 text-muted-foreground">Type: <strong>{documentType}</strong></span>}
              <span>Analysis completed in <span className="font-medium text-foreground">{time}</span></span>
            </CardDescription>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-sm font-medium text-muted-foreground mb-1">Confidence Score</div>
            <div className={`text-4xl font-black tracking-tight ${
              isVerified ? "text-success" : isFlagged ? "text-destructive" : "text-warning"
            }`}>
              {score}%
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          {/* Granular Result Cards */}
          {details && (
            <div className={`grid grid-cols-2 sm:grid-cols-${(details.address_match !== null && details.address_match !== undefined) ? '4' : '3'} gap-4 mb-8`}>
              {/* Scan Integrity */}
              <div className={`p-4 rounded-xl border ${details.forgery_detected ? 'bg-destructive/5 border-destructive/20' : 'bg-success/5 border-success/20'}`}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Scan Integrity</p>
                <div className="flex items-center gap-2">
                  {details.forgery_detected ? <XCircle className="h-4 w-4 text-destructive" /> : <CheckCircle2 className="h-4 w-4 text-success" />}
                  <span className={`text-sm font-bold ${details.forgery_detected ? 'text-destructive' : 'text-success'}`}>
                    {details.forgery_detected ? 'Forgery Detected' : 'Original'}
                  </span>
                </div>
              </div>

              {/* Identity Match */}
              <div className={`p-4 rounded-xl border ${details.name_match ? 'bg-success/5 border-success/20' : 'bg-warning/5 border-warning/20'}`}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Identity Match</p>
                <div className="flex items-center gap-2">
                  {details.name_match ? <CheckCircle2 className="h-4 w-4 text-success" /> : <AlertTriangle className="h-4 w-4 text-warning" />}
                  <span className={`text-sm font-bold ${details.name_match ? 'text-success' : 'text-warning'}`}>
                    {details.name_match ? 'Matched' : 'Mismatch'}
                  </span>
                </div>
              </div>

              {/* Address Match (Utility only) */}
              {details.address_match !== null && details.address_match !== undefined && (
                <div className={`p-4 rounded-xl border ${details.address_match ? 'bg-success/5 border-success/20' : 'bg-warning/5 border-warning/20'}`}>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Address Match</p>
                  <div className="flex items-center gap-2">
                    {details.address_match ? <CheckCircle2 className="h-4 w-4 text-success" /> : <AlertTriangle className="h-4 w-4 text-warning" />}
                    <span className={`text-sm font-bold ${details.address_match ? 'text-success' : 'text-warning'}`}>
                      {details.address_match ? 'Confirmed' : 'Mismatch'}
                    </span>
                  </div>
                </div>
              )}

              {/* Registry / RC Status */}
              <div className={`p-4 rounded-xl border ${details.registry_verified ? 'bg-success/5 border-success/20' : 'bg-muted border-border'}`}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Registry Status</p>
                <div className="flex items-center gap-2">
                  {details.registry_verified ? <CheckCircle2 className="h-4 w-4 text-success" /> : <ShieldCheck className="h-4 w-4 text-muted-foreground" />}
                  <span className={`text-sm font-bold ${details.registry_verified ? 'text-success' : 'text-muted-foreground'}`}>
                    {details.registry_verified ? 'Confirmed' : 'Visual Only'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* RC Number Status (CAC only) */}
          {details?.rc_number && (
            <div className="mb-6 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-start gap-3">
              <Clock className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-700">RC Number Found: {details.rc_number}</p>
                <p className="text-xs text-amber-600 mt-1">
                  Live CAC Registry API verification is not yet implemented. The RC number has been extracted but not validated against the official CAC database.
                </p>
              </div>
            </div>
          )}

          {/* Error Warning */}
          {details?.error_message && (
            <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-md flex gap-3 text-destructive">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-bold">Verification Warning</p>
                <p className="text-xs leading-relaxed opacity-90">{details.error_message}</p>
              </div>
            </div>
          )}

          {/* AI Analysis Summary */}
          {details?.ai_summary && (
            <div className="mb-8 p-4 bg-secondary/50 border border-border rounded-xl flex gap-3">
              <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">AI Analysis Summary</p>
                <p className="text-sm text-foreground leading-relaxed">{details.ai_summary}</p>
              </div>
            </div>
          )}

          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
            Detected Signals
          </h3>

          <div className="space-y-3 mb-8">
            {signals.map((signal, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-md bg-secondary border border-border">
                {(signal.toLowerCase().includes("critical") ||
                  signal.toLowerCase().includes("forger") ||
                  signal.toLowerCase().includes("fraud") ||
                  signal.toLowerCase().includes("manipulat") ||
                  signal.toLowerCase().includes("inconsist")) ? (
                  <XCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                ) : (signal.toLowerCase().includes("confirmed") ||
                  signal.toLowerCase().includes("passed") ||
                  signal.toLowerCase().includes("present") ||
                  signal.toLowerCase().includes("authentic") ||
                  signal.toLowerCase().includes("verified") ||
                  signal.toLowerCase().includes("valid") ||
                  signal.toLowerCase().includes("matched") ||
                  signal.toLowerCase().includes("original")) ? (
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5 shrink-0" />
                )}
                <span className="text-sm font-medium text-foreground">{signal}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="w-full sm:w-auto flex items-center justify-center gap-2 h-11" onClick={handleDownloadPdf}>
              <Download className="h-4 w-4" />
              Download Audit PDF
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center justify-center gap-2 h-11"
              onClick={() => {
                const blob = new Blob([JSON.stringify(rawData, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `instaverify-raw-${id || 'report'}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              <FileCheck className="h-4 w-4" />
              View Raw Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
