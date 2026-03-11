'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users } from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  role: string;
}

export function AdminFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const currentAdminId = searchParams.get('adminId') || 'all';

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const res = await fetch('/api/admin/users');
        const data = await res.json();
        if (res.ok) {
          // Only show regular admins in the filter, or all if preferred
          setAdmins(data.users || []);
        }
      } catch (err) {
        console.error('Failed to fetch admins for filter', err);
      }
    }
    fetchAdmins();
  }, []);

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('adminId');
    } else {
      params.set('adminId', value);
    }
    router.push(`/dashboard?${params.toString()}`);
  };

  if (admins.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground hidden lg:inline-block">Filter by Admin:</span>
      <Select value={currentAdminId} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[200px] h-10 bg-card border-border/50">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 opacity-50" />
            <SelectValue placeholder="All Administrators" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Administrators</SelectItem>
          {admins.map((admin) => (
            <SelectItem key={admin.id} value={admin.id}>
              {admin.email}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
