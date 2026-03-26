import { createClient } from '@supabase/supabase-js';

async function run() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  console.log("Fetching last 5 submissions...");
  const { data, error } = await supabaseAdmin
    .from('submissions')
    .select('id, document_type, upload_time, verified_by, merchant_name, status')
    .order('upload_time', { ascending: false })
    .limit(5);

  if (error) console.error("Error:", error);
  else {
    data.forEach(d => console.log(d.id, d.document_type, d.merchant_name, "User:", d.verified_by, "Status:", d.status));
  }
}

run();
