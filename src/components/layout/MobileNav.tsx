'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Upload, Users } from 'lucide-react';

export function MobileNav({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    ...(isSuperAdmin ? [{ name: 'Admins', href: '/dashboard/admins', icon: Users }] : []),
    { name: 'Verify', href: '/upload', icon: Upload },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex items-center justify-around pb-safe">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full py-3 transition-colors ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className={`h-5 w-5 mb-1 ${isActive ? 'fill-primary/20' : ''}`} />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
