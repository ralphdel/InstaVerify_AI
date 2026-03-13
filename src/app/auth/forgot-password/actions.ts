'use server';

import { createClient } from '@/utils/supabase/server';

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get('email') as string;
  const supabase = await createClient();
  
  // Use environment variable with a safe fallback to prevent undefined URLs
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const redirectTo = `${baseUrl}/auth/callback?type=recovery`;

  console.log(`[Auth] Attempting password reset for: ${email}`);
  console.log(`[Auth] Redirect URL: ${redirectTo}`);

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo,
  });

  if (error) {
    console.error(`[Auth Error] Reset Password Failed:`, error.message);
    return { error: error.message };
  }

  return { success: true };
}
