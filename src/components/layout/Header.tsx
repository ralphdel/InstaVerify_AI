import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { createClient } from '@/utils/supabase/server';
import { UserNav } from './UserNav';

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const initials = user?.email
    ? user.email.substring(0, 2).toUpperCase()
    : '??';

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="w-1/3 min-w-[250px]">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search merchants, IDs..." 
            className="w-full bg-secondary/50 border-transparent focus-visible:ring-1 focus-visible:ring-ring pl-9" 
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <UserNav user={user ? { email: user.email } : null} />
      </div>
    </header>
  );
}
