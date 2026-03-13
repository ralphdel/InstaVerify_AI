'use server';

import { createClient } from '@/utils/supabase/server';
import { sendPasswordChangedNotification } from '@/lib/mail';

export async function notifyPasswordChanged() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Send security notification via Resend
  if (user?.email) {
    await sendPasswordChangedNotification(user.email);
  }

  return { success: true };
}
