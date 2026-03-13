import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const maxDuration = 60; // Allow 60s to prevent Vercel 504 timeouts

// Use service role key server-side to bypass RLS for submissions
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      merchantName,
      merchantAddress,
      documentType,
      status,
      score,
      signals,
      verified_by,
      verified_by_email,
      verification_details,
    } = body;

    const id = `INV-${Math.floor(Math.random() * 90000) + 10000}`;
    const submission = {
      id,
      merchant_name: merchantName,
      merchant_address: merchantAddress,
      document_type: documentType,
      status,
      confidence_score: score,
      signals,
      upload_time: new Date().toISOString(),
      verified_by,
      verified_by_email,
      verification_details,
    };

    const { error } = await supabaseAdmin.from('submissions').insert([submission]);
    
    if (error) {
      console.error('[Save Submission] Supabase insert failed:', error.message);
      // Return the submission anyway so the client can navigate to the report
      // The record won't persist but at least the flow continues
      return NextResponse.json({ ...submission, _warning: 'DB save failed: ' + error.message });
    }

    console.log('[Save Submission] Saved to Supabase:', id);
    return NextResponse.json(submission);

  } catch (err: any) {
    console.error('[Save Submission] Error:', err.message);
    return NextResponse.json(
      { error: 'Failed to save submission', details: err.message },
      { status: 500 }
    );
  }
}
