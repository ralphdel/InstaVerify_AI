import { createClient } from '@supabase/supabase-js';

async function run() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const submission = {
    id: `INV-TEST1234`,
    merchant_name: "Test Combo",
    merchant_address: "123 Test St",
    document_type: "Combined (CAC + Utility)",
    status: "VERIFIED",
    confidence_score: 99,
    signals: ["Test"],
    upload_time: new Date().toISOString(),
    verification_details: {},
  };

  console.log("Inserting Combined...");
  const res1 = await supabaseAdmin.from('submissions').insert([submission]);
  console.log("Combo Result:", res1.error || "Success");

}

run();
