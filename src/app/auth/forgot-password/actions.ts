'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { sendPasswordResetViaSMTP } from '@/lib/brevo-mail';

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get('email') as string;
  const origin = formData.get('origin') as string;

  if (!email) {
    return { error: 'Email is required.' };
  }

  try {
    const supabaseAdmin = createAdminClient();
    const baseUrl = origin || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    console.log(`[Auth] Generating recovery link for: ${email}`);

    // Generate recovery link via Admin API
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email: email,
      options: {
        redirectTo: `${baseUrl}/auth/callback?type=recovery`,
      },
    });

    if (error) {
      console.error(`[Auth Error] generateLink failed:`, error.message);
      return { error: error.message };
    }

    if (!data?.properties?.action_link) {
      return { error: 'Failed to generate reset link. Please try again.' };
    }

    // Send directly via Brevo SMTP — works for ANY recipient
    const result = await sendPasswordResetViaSMTP(email, data.properties.action_link);

    if (!result.success) {
      console.error(`[Auth Error] SMTP send failed:`, result.error);
      return { error: 'Failed to send reset email. Please try again.' };
    }

    console.log(`[Auth] ✅ Password reset email sent to ${email}`);
    return { success: true };
  } catch (err) {
    console.error(`[Auth Error] Unexpected error:`, err);
    return { error: 'Something went wrong. Please try again.' };
  }
}

