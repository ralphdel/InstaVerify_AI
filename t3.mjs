async function testSave() {
  const payload = {
    merchantName: "Test",
    merchantAddress: "Test",
    documentType: "Combined (CAC + Utility)",
    status: "FLAGGED",
    score: 50,
    signals: ["AI analysis unavailable — network error. Manual review required."],
    verification_details: {
      forgery_detected: false,
      name_match: true,
      address_match: null,
      registry_verified: false,
      rc_number: null,
      rc_number_found: false,
      rc_verification_status: "pending_api",
      error_message: "Server returned an invalid response format",
      ai_summary: "Document submitted for review."
    }
  };

  console.log("Sending save-submission...");
  try {
    const res = await fetch('http://localhost:3000/api/save-submission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log("HTTP STATUS:", res.status);
    const json = await res.json();
    console.log("BODY:", json);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}
testSave();
