import React from 'react';
import Link from 'next/link';
import { Home, Upload, Settings, ShieldCheck, LogOut, Users } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { logout } from '@/app/login/actions';
import { Button } from '@/components/ui/button';

export async function Sidebar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const isSuperAdmin = user?.user_metadata?.role === 'super_admin';

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg text-primary tracking-tight">InstaVerify-AI</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-secondary-foreground hover:bg-secondary transition-colors">
          <Home className="h-4 w-4" />
          Dashboard
        </Link>
        <Link href="/upload" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-secondary-foreground hover:bg-secondary transition-colors">
          <Upload className="h-4 w-4" />
          Verify Document
        </Link>
        {isSuperAdmin && (
          <Link href="/dashboard/admins" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-secondary-foreground hover:bg-secondary transition-colors">
            <Users className="h-4 w-4" />
            Manage Admins
          </Link>
        )}
      </nav>
      <div className="p-4 border-t border-border space-y-3">
        {user && (
          <div className="px-3 py-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Signed in as</p>
            <p className="text-sm font-medium text-foreground truncate" title={user.email}>
              {user.email}
            </p>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <form action={logout}>
            <Button
              variant="ghost"
              type="submit"
              className="w-full justify-start gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors h-auto"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </aside>
  );
}
