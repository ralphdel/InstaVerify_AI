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
}

export function VerificationResult({ status, score, signals, time }: VerificationResultProps) {
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
            {isFlagged && <Badge className="bg-destructive hover:bg-destructive/90 text-destructive-foreground ml-2 border-transparent">FLAGGED</Badge>}
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
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-muted-foreground" />
          Detected Signals
        </h3>
        
        <div className="space-y-3 mb-8">
          {signals.map((signal, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-md bg-secondary border border-border">
              {isVerified ? (
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
              ) : isFlagged ? (
                <XCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5 shrink-0" />
              )}
              <span className="text-sm font-medium text-foreground">{signal}</span>
            </div>
          ))}
        </div>

        {isConditional && (
          <div className="mb-8 p-4 bg-warning/10 border border-warning/20 rounded-md flex gap-3 text-warning-foreground">
            <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0" />
            <p className="text-sm font-medium">Manual compliance review recommended due to lower confidence score.</p>
          </div>
        )}

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
