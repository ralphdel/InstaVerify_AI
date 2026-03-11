'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Trash2, Loader2, AlertCircle, CheckCircle2, Users } from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  role: string;
  must_change_password: boolean;
  created_at: string;
  last_sign_in_at: string | null;
}

export default function AdminManagementPage() {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState('');

  async function fetchUsers() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUsers(data.users);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function checkRoleAndFetch() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user || user.user_metadata?.role !== 'super_admin') {
        router.push('/dashboard');
        return;
      }

      setIsVerifying(false);
      fetchUsers();
    }

    checkRoleAndFetch();
  }, [router]);

  if (isVerifying) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary/60" />
        <span className="ml-3 text-muted-foreground animate-pulse">Verifying credentials...</span>
      </div>
    );
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setIsCreating(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess(`new user(admin) added successfully! Default password is "admin1234".`);
      setNewEmail('');
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create admin');
    } finally {
      setIsCreating(false);
    }
  }

  async function handleDelete(userId: string, email: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete admin "${email}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingId(userId);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/admin/users?id=${userId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess(`Admin "${email}" deleted successfully.`);
      fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete admin');
    } finally {
      setDeletingId(null);
    }
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-6 w-6" />
            Admin Management
          </h2>
          <p className="text-muted-foreground">
            Manage admin users who can access the operator dashboard.
          </p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm);
            setError(null);
            setSuccess(null);
          }}
          className="gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Add Admin
        </Button>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/5 px-4 py-3 text-sm text-success animate-in fade-in slide-in-from-top-1">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Add Admin Form */}
      {showForm && (
        <Card className="border-primary/20 animate-in fade-in slide-in-from-top-2 duration-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Create New Admin</CardTitle>
            <CardDescription>
              New admins will be created with the default password <code className="bg-secondary px-1 rounded text-foreground font-mono">admin1234</code>. They will be required to change it upon their first login.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="new-email">Email Address</Label>
                <Input
                  id="new-email"
                  type="email"
                  placeholder="admin-email@instaverify.ai"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  className="h-10 border-border/50 focus:border-primary"
                />
              </div>
              <div className="flex items-end gap-2">
                <Button type="submit" disabled={isCreating} className="h-10 px-8">
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Assistant'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="h-10"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Users Table */}
      <Card className="overflow-hidden border-border/50">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary/60" />
              <span className="ml-3 text-muted-foreground animate-pulse">Synchronizing directory...</span>
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Users className="h-12 w-12 mb-4 opacity-20" />
              <p className="font-semibold text-lg">No administrators found</p>
              <p className="text-sm opacity-70">Add a new admin to help manage verifications.</p>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow>
                  <TableHead className="w-[300px]">Email Address</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Account Created</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="text-right">Manage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id} className="group hover:bg-secondary/20 transition-colors">
                    <TableCell className="font-medium align-middle">{u.email}</TableCell>
                    <TableCell className="align-middle">
                      {u.role === 'super_admin' ? (
                        <Badge className="bg-primary/15 text-primary border-primary/20 hover:bg-primary/20">
                          Super Admin
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground border-border/50">
                          Admin
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="align-middle">
                      {u.must_change_password ? (
                        <Badge variant="outline" className="bg-warning/10 text-orange-500 border-orange-500/20">
                          Pending Reset
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          Active
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm align-middle">
                      {formatDate(u.created_at)}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm align-middle">
                      {formatDate(u.last_sign_in_at)}
                    </TableCell>
                    <TableCell className="text-right align-middle">
                      {u.role !== 'super_admin' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(u.id, u.email || '')}
                          disabled={deletingId === u.id}
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                        >
                          {deletingId === u.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
