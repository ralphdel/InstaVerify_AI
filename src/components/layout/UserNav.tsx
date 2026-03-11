'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Bell, User, LogOut, Settings, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/login/actions';

interface UserNavProps {
  user: {
    email?: string | null;
  } | null;
}

export function UserNav({ user }: UserNavProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = user?.email
    ? user.email.substring(0, 2).toUpperCase()
    : '??';

  return (
    <div className="flex items-center gap-3">
      {/* Notifications */}
      <div className="relative" ref={notificationsRef}>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-foreground relative"
          onClick={() => {
            setIsNotificationsOpen(!isNotificationsOpen);
            setIsProfileOpen(false);
          }}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-success ring-2 ring-card" />
        </Button>
        
        {isNotificationsOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 z-50">
            <div className="p-4 border-b border-border">
              <h4 className="text-sm font-semibold">Notifications</h4>
            </div>
            <div className="p-8 text-center">
              <div className="h-12 w-12 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-3">
                <Bell className="h-6 w-6 text-muted-foreground/40" />
              </div>
              <p className="text-sm font-medium text-foreground">No new notifications</p>
              <p className="text-xs text-muted-foreground mt-1">We&apos;ll notify you when documents are verified.</p>
            </div>
          </div>
        )}
      </div>

      {/* Profile */}
      <div className="relative" ref={profileRef}>
        <button 
          onClick={() => {
            setIsProfileOpen(!isProfileOpen);
            setIsNotificationsOpen(false);
          }}
          className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold cursor-pointer hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-card transition-all"
        >
          {initials}
        </button>
        
        {isProfileOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-lg shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 z-50 overflow-hidden">
            <div className="p-4 bg-muted/30 border-b border-border">
              <p className="text-sm font-semibold text-foreground truncate">{user?.email}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Administrator</p>
            </div>
            <div className="p-2">
              <Link
                href="/dashboard/admins"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-secondary-foreground hover:bg-secondary transition-colors"
              >
                <Settings className="h-4 w-4 text-muted-foreground" />
                Account Settings
              </Link>
              <Link
                href="/"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-secondary-foreground hover:bg-secondary transition-colors"
              >
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                Back to Home
              </Link>
              <div className="mt-1 pt-1 border-t border-border">
                <form action={logout}>
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded-md text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
