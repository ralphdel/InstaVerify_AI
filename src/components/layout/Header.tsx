import React from 'react';
import { Search } from 'lucide-react';
import { SearchInput } from './SearchInput';
import { createClient } from '@/utils/supabase/server';
import { UserNav } from './UserNav';

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch recent flagged notifications for this user (or all if super admin)
  let notifications: { id: string; merchant_name: string; upload_time: string }[] = [];
  if (user) {
    const role = user.user_metadata?.role;
    let query = supabase
      .from("submissions")
      .select("id, merchant_name, upload_time")
      .eq("status", "FLAGGED")
      .order("upload_time", { ascending: false })
      .limit(3);
      
    if (role !== 'super_admin') {
      query = query.eq("verified_by", user.id);
    }
    
    const { data } = await query;
    if (data) notifications = data;
  }

  const initials = user?.email
    ? user.email.substring(0, 2).toUpperCase()
    : '??';

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 w-full">
      <div className="flex-1 md:w-1/3 md:min-w-[250px] mr-4">
        <SearchInput />
      </div>
      <div className="flex items-center gap-3">
        <UserNav user={user ? { email: user.email } : null} notifications={notifications} />
      </div>
    </header>
  );
}
