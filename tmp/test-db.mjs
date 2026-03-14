import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testInsert() {
  const id = `INV-${Math.floor(Math.random() * 90000) + 10000}`;
  const submission = {
    id,
    merchant_name: 'Test Merchant',
    merchant_address: '123 Test St',
    document_type: 'CAC Certificate',
    status: 'Verified',
    confidence_score: 95,
    signals: ['test'],
    upload_time: new Date().toISOString(),
    verified_by: null,
    verified_by_email: null,
    verification_details: { test: true },
  };

  const { data, error } = await supabaseAdmin.from('submissions').insert([submission]);
  
  if (error) {
    console.error('Insert failed:', error);
  } else {
    console.log('Insert succeeded:', data);
  }
}

testInsert();
