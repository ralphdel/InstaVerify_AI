'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { sendPasswordChangedNotification } from '@/lib/mail';

export async function notifyPasswordChanged() {
  const supabase = await createClient();

  // Update user metadata to clear the must_change_password flag
  const { error: metadataError } = await supabase.auth.updateUser({
    data: {
      must_change_password: false
    }
  });

  if (metadataError) {
    return { error: metadataError.message };
  }

  // Send security notification via Resend
  const { data: { user } } = await supabase.auth.getUser();
  if (user?.email) {
    await sendPasswordChangedNotification(user.email);
  }

  revalidatePath('/', 'layout');
  return { success: true };
}
