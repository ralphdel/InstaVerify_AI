import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  
  // PKCE flow uses 'code'
  const code = searchParams.get('code');
  // Email OTP flow (like generateLink) uses 'token_hash' and 'type'
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType;
  
  let next = searchParams.get('next') ?? '/dashboard';
  
  if (type === 'recovery') {
    next = '/auth/reset-password';
  }

  const supabase = await createClient();

  // Handle Token Hash (from generateLink / OTP flows)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error('[Auth Callback] verifyOtp Error:', error);
  } 
  // Handle PKCE Code
  else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error('[Auth Callback] exchangeCodeForSession Error:', error);
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`);
}

