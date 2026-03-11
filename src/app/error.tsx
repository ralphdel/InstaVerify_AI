'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-card border border-border rounded-xl shadow-lg p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="h-16 w-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
          Internal Server Error
        </h2>
        
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          We encountered an unexpected error while processing your request. 
          This has been logged and our team is investigating.
        </p>
        
        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => reset()}
            className="w-full h-11 font-medium"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          
          <Button 
            variant="ghost" 
            asChild
            className="w-full h-11 text-muted-foreground"
          >
            <a href="/">Return to Home</a>
          </Button>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 text-left p-4 bg-muted/50 rounded-lg overflow-auto max-h-40">
            <p className="text-[10px] font-mono text-muted-foreground break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-[10px] font-mono text-muted-foreground mt-2">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
