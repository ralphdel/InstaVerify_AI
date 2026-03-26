"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

const steps = [
  "Analyzing document...",
  "Running visual forgery detection...",
  "Validating logic and arithmetic...",
  "Querying CAC Registry...",
  "Calculating confidence score..."
];

export function ProcessingState({ onComplete, isUploadComplete }: { onComplete: () => void, isUploadComplete: boolean }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalTime = 4000; // Simulated fast UI processing matching MVP requirement (<60s)
    const intervalTime = totalTime / 100;
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        // Hold at 98% if the backend is still processing
        if (prev >= 98 && !isUploadComplete) {
          return 98;
        }

        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        
        const stepIndex = Math.floor((prev / 100) * steps.length);
        if (stepIndex !== currentStep && stepIndex < steps.length) {
          setCurrentStep(stepIndex);
        }
        
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [currentStep, onComplete, isUploadComplete]);

  return (
    <div className="max-w-md mx-auto p-8 bg-card border border-border rounded-xl shadow-sm">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative flex items-center justify-center w-24 h-24">
          <svg className="absolute w-full h-full -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="44"
              className="stroke-secondary fill-none"
              strokeWidth="8"
            />
            <circle
              cx="48"
              cy="48"
              r="44"
              className="stroke-primary fill-none transition-all duration-100 ease-out"
              strokeWidth="8"
              strokeDasharray="276"
              strokeDashoffset={276 - (progress / 100) * 276}
            />
          </svg>
          <span className="text-xl font-bold">{Math.round(progress)}%</span>
        </div>
        
        <div className="w-full space-y-3 mt-8">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep || progress === 100;
            const isCurrent = index === currentStep && progress < 100;
            
            return (
              <div key={index} className="flex items-center gap-3">
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-success animate-in zoom-in duration-300" />
                ) : isCurrent ? (
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                ) : (
                  <Circle className="h-5 w-5 text-muted stroke-[2]" />
                )}
                <span className={`text-sm tracking-tight transition-colors duration-300 ${
                  isCompleted ? "text-foreground" : transformCurrentStateStyle(isCurrent)
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function transformCurrentStateStyle(isCurrent: boolean) {
  return isCurrent ? "text-primary font-medium" : "text-muted-foreground";
}
