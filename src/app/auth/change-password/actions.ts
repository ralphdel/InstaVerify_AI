'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updatePassword(formData: FormData) {
  const supabase = await createClient();
  const password = formData.get('newPassword') as string;

  // Update the password in Supabase Auth
  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return { error: error.message };
  }

  // Update user metadata to clear the must_change_password flag
  const { error: metadataError } = await supabase.auth.updateUser({
    data: {
      must_change_password: false
    }
  });

  if (metadataError) {
    return { error: metadataError.message };
  }

  revalidatePath('/', 'layout');
  return { success: true };
}
