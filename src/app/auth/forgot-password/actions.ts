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
        // Point to the server callback to establish the session, then redirect to the reset form
        redirectTo: `${baseUrl}/auth/callback?next=/auth/reset-password`,
      },
    });

    if (error) {
      console.error(`[Auth Error] generateLink failed:`, error.message);
      return { error: error.message };
    }

    if (!data?.properties?.hashed_token) {
      return { error: 'Failed to generate reset link. Please try again.' };
    }

    // Construct a custom link that hits the Next.js server callback directly with the token hash
    // This entirely avoids unstable client-side URL hash Fragment parsing
    const customLink = `${baseUrl}/auth/callback?token_hash=${data.properties.hashed_token}&type=recovery&next=/auth/reset-password`;

    // Send directly via Brevo SMTP
    const result = await sendPasswordResetViaSMTP(email, customLink);

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

