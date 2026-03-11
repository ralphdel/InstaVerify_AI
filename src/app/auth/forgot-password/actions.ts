'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { sendPasswordResetEmail } from '@/lib/mail';

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get('email') as string;
  const supabaseAdmin = createAdminClient();

  // Generate a recovery link manually using the Admin client
  // This allows us to send the email ourselves via Resend
  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: 'recovery',
    email: email,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data?.properties?.action_link) {
    // Send the email manually via Resend
    await sendPasswordResetEmail(email, data.properties.action_link);
    return { success: true };
  }

  return { error: 'Failed to generate reset link.' };
}
