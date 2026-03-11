import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, XCircle, Download, ShieldCheck, FileCheck } from "lucide-react";

export type VerificationStatus = "VERIFIED" | "CONDITIONAL APPROVAL" | "FLAGGED";

interface VerificationResultProps {
  status: VerificationStatus;
  score: number;
  signals: string[];
  time: string;
  details?: {
    forgery_detected: boolean;
    name_match: boolean;
    registry_verified: boolean;
    rc_number_found?: boolean;
    error_message?: string;
  };
}

export function VerificationResult({ status, score, signals, time, details }: VerificationResultProps) {
  const isVerified = status === "VERIFIED";
  const isFlagged = status === "FLAGGED";
  const isConditional = status === "CONDITIONAL APPROVAL";

  return (
    <Card className="max-w-3xl mx-auto border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-8 border-b border-border">
        <div>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            Verification Result
            {isVerified && <Badge className="bg-success hover:bg-success/90 text-success-foreground ml-2 border-transparent">VERIFIED</Badge>}
            {isConditional && <Badge className="bg-warning hover:bg-warning/90 text-warning-foreground ml-2 border-transparent">CONDITIONAL</Badge>}
            {isFlagged && <Badge className="bg-destructive hover:bg-success/90 text-destructive-foreground ml-2 border-transparent">FLAGGED</Badge>}
          </CardTitle>
          <CardDescription className="mt-2 text-base">
            Document analysis completed in <span className="font-medium text-foreground">{time}</span>
          </CardDescription>
        </div>
        <div className="text-right">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className={`p-4 rounded-xl border ${details.forgery_detected ? 'bg-destructive/5 border-destructive/20' : 'bg-success/5 border-success/20'}`}>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Scan Integrity</p>
              <div className="flex items-center gap-2">
                {details.forgery_detected ? <XCircle className="h-4 w-4 text-destructive" /> : <CheckCircle2 className="h-4 w-4 text-success" />}
                <span className={`text-sm font-bold ${details.forgery_detected ? 'text-destructive' : 'text-success'}`}>
                  {details.forgery_detected ? 'Forgery Detected' : 'Original'}
                </span>
              </div>
            </div>
            <div className={`p-4 rounded-xl border ${details.name_match ? 'bg-success/5 border-success/20' : 'bg-warning/5 border-warning/20'}`}>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Identity Match</p>
              <div className="flex items-center gap-2">
                {details.name_match ? <CheckCircle2 className="h-4 w-4 text-success" /> : <AlertTriangle className="h-4 w-4 text-warning" />}
                <span className={`text-sm font-bold ${details.name_match ? 'text-success' : 'text-warning'}`}>
                  {details.name_match ? 'Matched' : 'Mismatch'}
                </span>
              </div>
            </div>
            <div className={`p-4 rounded-xl border ${details.registry_verified ? 'bg-success/5 border-success/20' : 'bg-muted border-border'}`}>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Registry Status</p>
              <div className="flex items-center gap-2">
                {details.registry_verified ? <CheckCircle2 className="h-4 w-4 text-success" /> : <ShieldCheck className="h-4 w-4 text-muted-foreground" />}
                <span className={`text-sm font-bold ${details.registry_verified ? 'text-success' : 'text-muted-foreground'}`}>
                  {details.registry_verified ? 'Confirmed' : 'Unverified'}
                </span>
              </div>
            </div>
          </div>
        )}

        {details?.error_message && (
          <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-md flex gap-3 text-destructive">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-bold">Verification Warning</p>
              <p className="text-xs leading-relaxed opacity-90">{details.error_message}</p>
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
              {signal.toLowerCase().includes("critical") ? (
                <XCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
              ) : signal.toLowerCase().includes("confirmed") || signal.toLowerCase().includes("passed") ? (
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5 shrink-0" />
              )}
              <span className="text-sm font-medium text-foreground">{signal}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button className="w-full sm:w-auto flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Audit PDF
          </Button>
          <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            View Raw Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
