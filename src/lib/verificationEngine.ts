export interface VerificationResultData {
  score: number;
  signals: string[];
  anomalies: string[];
}

export function simulateVerification(fileType: string): VerificationResultData {
  const score = Math.floor(Math.random() * 60) + 40;
  
  const allSignals = [
    "Seal alignment verified",
    "Registry match confirmed",
    "Document metadata valid",
    "No visual overlays detected",
    "Font heuristics match expected era"
  ];
  
  const possibleAnomalies = [
    "Seal alignment mismatch",
    "Image resolution anomaly",
    "Arithmetic mismatch",
    "Missing watermark",
    "Suspicious modification date in metadata"
  ];

  const signals = [];
  const anomalies = [];

  if (score >= 80) {
    signals.push(...allSignals.slice(0, 3));
    if (Math.random() > 0.5) signals.push(allSignals[3]);
  } else if (score >= 60) {
    signals.push(allSignals[0], allSignals[2]);
    anomalies.push(possibleAnomalies[0]);
    if (Math.random() > 0.5) anomalies.push(possibleAnomalies[1]);
  } else {
    signals.push(allSignals[2]);
    anomalies.push(possibleAnomalies[0], possibleAnomalies[1], possibleAnomalies[3]);
  }

  return {
    score,
    signals,
    anomalies
  };
}
