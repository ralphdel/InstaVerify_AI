"use client";
import { useState, useCallback } from "react";
import { UploadCloud, File, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function UploadZone({ onUpload }: { onUpload: (cacFile: File | null, utilityFile: File | null, merchantName: string, merchantAddress: string) => void }) {
  const [cacFile, setCacFile] = useState<File | null>(null);
  const [utilityFile, setUtilityFile] = useState<File | null>(null);
  const [merchantName, setMerchantName] = useState("");
  const [merchantAddress, setMerchantAddress] = useState("");
  const [dragActiveCAC, setDragActiveCAC] = useState(false);
  const [dragActiveUtility, setDragActiveUtility] = useState(false);

  const handleDragCAC = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActiveCAC(true);
    else if (e.type === "dragleave" || e.type === "drop") setDragActiveCAC(false);
  }, []);

  const handleDragUtility = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActiveUtility(true);
    else if (e.type === "dragleave" || e.type === "drop") setDragActiveUtility(false);
  }, []);

  const handleDropCAC = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveCAC(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size <= 10 * 1024 * 1024) setCacFile(file);
      else alert("File must be less than 10MB");
    }
  }, []);

  const handleDropUtility = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveUtility(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size <= 10 * 1024 * 1024) setUtilityFile(file);
      else alert("File must be less than 10MB");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((cacFile || utilityFile) && merchantName && merchantAddress) {
      onUpload(cacFile, utilityFile, merchantName, merchantAddress);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto border-border shadow-sm">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="merchantName" className="text-sm font-semibold">Business/Merchant Name</Label>
              <Input 
                id="merchantName" 
                placeholder="As it appears on documentation" 
                value={merchantName}
                onChange={(e) => setMerchantName(e.target.value)}
                required 
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="merchantAddress" className="text-sm font-semibold">Business Address</Label>
              <Input 
                id="merchantAddress" 
                placeholder="Full operational address" 
                value={merchantAddress}
                onChange={(e) => setMerchantAddress(e.target.value)}
                required 
                className="h-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CAC Upload Area */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <File className="h-4 w-4 text-primary" />
                CAC Certificate (Optional)
              </Label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-6 h-48 flex flex-col items-center justify-center transition-all duration-200
                  ${dragActiveCAC ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:border-primary/40"}
                  ${cacFile ? "bg-primary/5 border-primary/30" : "bg-card"}
                `}
                onDragEnter={handleDragCAC}
                onDragLeave={handleDragCAC}
                onDragOver={handleDragCAC}
                onDrop={handleDropCAC}
              >
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => e.target.files?.[0] && setCacFile(e.target.files[0])}
                  accept=".pdf,.png,.jpg,.jpeg"
                />
                {!cacFile ? (
                  <div className="text-center">
                    <UploadCloud className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                    <p className="text-xs font-medium text-foreground">Upload CAC</p>
                    <p className="text-[10px] text-muted-foreground mt-1">PDF/JPG (max. 10MB)</p>
                  </div>
                ) : (
                  <div className="text-center z-10">
                    <div className="bg-primary text-primary-foreground p-2 rounded-lg inline-block mb-2">
                      <File className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-semibold truncate max-w-[150px]">{cacFile.name}</p>
                    <button type="button" onClick={() => setCacFile(null)} className="mt-2 text-[10px] text-destructive hover:underline">Remove</button>
                  </div>
                )}
              </div>
            </div>

            {/* Utility Bill Upload Area */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <File className="h-4 w-4 text-primary" />
                Utility Bill (Optional)
              </Label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-6 h-48 flex flex-col items-center justify-center transition-all duration-200
                  ${dragActiveUtility ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:border-primary/40"}
                  ${utilityFile ? "bg-primary/5 border-primary/30" : "bg-card"}
                `}
                onDragEnter={handleDragUtility}
                onDragLeave={handleDragUtility}
                onDragOver={handleDragUtility}
                onDrop={handleDropUtility}
              >
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => e.target.files?.[0] && setUtilityFile(e.target.files[0])}
                  accept=".pdf,.png,.jpg,.jpeg"
                />
                {!utilityFile ? (
                  <div className="text-center">
                    <UploadCloud className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                    <p className="text-xs font-medium text-foreground">Upload Bill</p>
                    <p className="text-[10px] text-muted-foreground mt-1">PDF/JPG (max. 10MB)</p>
                  </div>
                ) : (
                  <div className="text-center z-10">
                    <div className="bg-primary text-primary-foreground p-2 rounded-lg inline-block mb-2">
                      <File className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-semibold truncate max-w-[150px]">{utilityFile.name}</p>
                    <button type="button" onClick={() => setUtilityFile(null)} className="mt-2 text-[10px] text-destructive hover:underline">Remove</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border mt-6">
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-bold shadow-lg" 
              disabled={(!cacFile && !utilityFile) || !merchantName || !merchantAddress}
            >
              Run Comprehensive Verification
            </Button>
            <p className="text-center text-[11px] text-muted-foreground mt-3">
              Note: At least one document is required for verification.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
