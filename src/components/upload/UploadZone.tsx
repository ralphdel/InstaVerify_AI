"use client";
import { useState, useCallback } from "react";
import { UploadCloud, File, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function UploadZone({ onUpload }: { onUpload: (file: File, merchantName: string, merchantAddress: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [merchantName, setMerchantName] = useState("");
  const [merchantAddress, setMerchantAddress] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave" || e.type === "drop") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.size <= 10 * 1024 * 1024) {
        setFile(droppedFile);
      } else {
        alert("File must be less than 10MB");
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size <= 10 * 1024 * 1024) {
        setFile(selectedFile);
      } else {
        alert("File must be less than 10MB");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file && merchantName && merchantAddress) {
      onUpload(file, merchantName, merchantAddress);
    }
  };

  return (
    <Card className="max-w-xl mx-auto border-border shadow-sm">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="merchantName">Merchant Name</Label>
              <Input 
                id="merchantName" 
                placeholder="e.g. Acme Tech Limited" 
                value={merchantName}
                onChange={(e) => setMerchantName(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="merchantAddress">Merchant Address</Label>
              <Input 
                id="merchantAddress" 
                placeholder="e.g. 12 Victoria Island, Lagos" 
                value={merchantAddress}
                onChange={(e) => setMerchantAddress(e.target.value)}
                required 
              />
            </div>
          </div>

          <div
            className={`mt-4 relative border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center transition-colors
              ${dragActive ? "border-primary bg-secondary/50" : "border-border hover:border-primary/50"}
              ${file ? "bg-secondary/20" : "bg-card"}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleChange}
              accept=".pdf,.png,.jpg,.jpeg"
            />
            
            {!file ? (
              <>
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <UploadCloud className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Click to drop or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, JPG, PNG (max. 10MB)
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center z-10 relative pointer-events-none">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <File className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground truncate max-w-[200px]">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-secondary text-muted-foreground pointer-events-auto hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full h-11" 
            disabled={!file || !merchantName || !merchantAddress}
          >
            Start Verification
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
