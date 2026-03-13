'use server';

import { createClient } from '@/utils/supabase/server';

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get('email') as string;
  const supabase = await createClient();

  // Reverting to Supabase's built-in email flow.
  // This is more reliable if Resend domain verification is not yet complete.
  // Supabase will handle the email sending using their own SMTP.
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?type=recovery`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
