'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { data: { user }, error } = await supabase.auth.signInWithPassword(data);

  if (error || !user) {
    redirect('/login?error=' + encodeURIComponent(error?.message || 'Invalid credentials'));
  }

  // Check if user has an admin role
  const role = user.user_metadata?.role;
  if (role !== 'super_admin' && role !== 'admin') {
    await supabase.auth.signOut();
    redirect('/login?error=' + encodeURIComponent('Access denied. Admin privileges required.'));
  }

  // Check if password change is forced
  if (user.user_metadata?.must_change_password) {
    redirect('/auth/change-password');
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/login');
}
