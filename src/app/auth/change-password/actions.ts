'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { sendPasswordChangedNotification } from '@/lib/mail';

export async function updatePassword(formData: FormData) {
  const supabase = await createClient();
  const password = formData.get('newPassword') as string;

  // Update the password AND clear the must_change_password flag in one call
  const { error } = await supabase.auth.updateUser({
    password: password,
    data: {
      must_change_password: false
    }
  });

  if (error) {
    return { error: error.message };
  }

  // Send security notification via Resend
  const { data: { user } } = await supabase.auth.getUser();
  if (user?.email) {
    await sendPasswordChangedNotification(user.email);
  }

  revalidatePath('/', 'layout');
  return { success: true };
}
