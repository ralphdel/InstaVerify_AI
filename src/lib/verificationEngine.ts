export interface VerificationDetails {
  forgery_detected: boolean;
  name_match: boolean;
  registry_verified: boolean;
  rc_number_found?: boolean;
  error_message?: string;
}

export interface VerificationResultData {
  score: number;
  signals: string[];
  details: VerificationDetails;
}

interface VerificationInput {
  cacFile: string | null;
  utilityFile: string | null;
  merchantName: string;
  merchantAddress: string;
}

export async function simulateVerification(input: VerificationInput): Promise<VerificationResultData> {
  const { cacFile, utilityFile, merchantName } = input;
  let score = 100;
  const signals: string[] = [];
  const details: VerificationDetails = {
    forgery_detected: false,
    name_match: true,
    registry_verified: false
  };

  // 1. Forgery Detection (STOPS EVERYTHING IF DETECTED)
  const isCacForged = cacFile?.toLowerCase().includes("forged") || false;
  const isUtilityForged = utilityFile?.toLowerCase().includes("forged") || false;

  if (isCacForged || isUtilityForged) {
    return {
      score: 10,
      signals: ["CRITICAL: Document forgery detected", "Verification halted for security"],
      details: {
        ...details,
        forgery_detected: true,
        name_match: false,
        registry_verified: false,
        error_message: "System flagged document as fraudulent. Manual investigation required."
      }
    };
  }

  signals.push("Forgery check passed (Scan integrity verified)");

  // 2. Name Cross-Verification (Doesn't break, but affects score/output)
  const nameOnDoc = merchantName; // Mock extraction
  const namesMatch = !merchantName.toLowerCase().includes("mismatch");
  
  if (!namesMatch) {
    score -= 40;
    details.name_match = false;
    details.error_message = `Business name on document does not match provided name: "${merchantName}"`;
    signals.push("Name mismatch detected between input and document");
  } else {
    signals.push("Business name confirmed across documents");
  }

  // 3. CAC Registry Verification (Mock Registry API like Dojah/Mono)
  if (cacFile) {
    const hasRcNumber = !cacFile.toLowerCase().includes("no_rc");
    const rcExists = !cacFile.toLowerCase().includes("invalid_rc");
    
    if (!hasRcNumber) {
      score -= 30;
      details.rc_number_found = false;
      details.error_message = details.error_message || "RC Number not found on CAC Certificate.";
      signals.push("CAC Registry check failed: RC Number missing");
    } else if (!rcExists) {
      score -= 50;
      details.rc_number_found = false;
      details.error_message = details.error_message || "Registry Error: RC Number not found in corporate database.";
      signals.push("CAC Registry check: Record not found");
    } else {
      details.rc_number_found = true;
      details.registry_verified = true;
      signals.push("CAC Registry: Business status confirmed (ACTIVE)");
      signals.push("RC Number verified via Registry API");
    }
  } else if (utilityFile) {
    signals.push("Utility bill verification successful (Address confirmed)");
  }

  // Final score logic
  if (score < 0) score = 0;

  return {
    score,
    signals,
    details
  };
}
