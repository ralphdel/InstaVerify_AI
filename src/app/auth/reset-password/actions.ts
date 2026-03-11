'use server';

import { createClient } from '@/utils/supabase/server';
import { sendPasswordChangedNotification } from '@/lib/mail';

export async function resetPassword(formData: FormData) {
  const password = formData.get('password') as string;
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return { error: error.message };
  }

  // Send security notification via Resend
  if (user?.email) {
    await sendPasswordChangedNotification(user.email);
  }

  return { success: true };
}
