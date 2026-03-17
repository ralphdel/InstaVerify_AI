'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye, Loader2, Database } from "lucide-react";
import Link from "next/link";

interface Submission {
  id: string;
  merchant_name: string;
  document_type: string;
  upload_time: string;
  status: string;
  confidence_score: number;
  verified_by_email?: string;
}

export function DashboardTable({ adminId, searchQuery }: { adminId?: string, searchQuery?: string }) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        let url = '/api/submissions';
        const params = new URLSearchParams();
        if (adminId) params.append('adminId', adminId);
        if (searchQuery) params.append('q', searchQuery);
        
        const qs = params.toString();
        if (qs) url += `?${qs}`;

        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setSubmissions(data.submissions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [adminId, searchQuery]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return <Badge className="bg-success hover:bg-success/90 text-success-foreground border-transparent">VERIFIED</Badge>;
      case "CONDITIONAL APPROVAL":
        return <Badge className="bg-warning hover:bg-warning/90 text-warning-foreground border-transparent">CONDITIONAL</Badge>;
      case "FLAGGED":
        return <Badge className="bg-destructive hover:bg-destructive/90 text-destructive-foreground border-transparent">FLAGGED</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const formatTime = (timeStr: string) => {
    return new Date(timeStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="rounded-md border border-border bg-card p-12 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary/60" />
        <p className="text-sm text-muted-foreground animate-pulse">Fetching verification history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border border-destructive/20 bg-destructive/5 p-8 text-center">
        <p className="text-destructive font-medium">{error}</p>
        <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="mt-4">
          Retry Connection
        </Button>
      </div>
    );
  }

  if (submissions.length === 0) {
    if (searchQuery) {
      return (
        <div className="rounded-md border border-border bg-card p-16 flex flex-col items-center justify-center text-center">
          <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Database className="h-6 w-6 text-muted-foreground opacity-50" />
          </div>
          <h3 className="text-lg font-medium">No results found</h3>
          <p className="text-sm text-muted-foreground max-w-[250px] mt-1">
            No submissions matched "{searchQuery}". Try a different search term.
          </p>
        </div>
      );
    }

    return (
      <div className="rounded-md border border-border bg-card p-16 flex flex-col items-center justify-center text-center">
        <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4">
          <Database className="h-6 w-6 text-muted-foreground opacity-50" />
        </div>
        <h3 className="text-lg font-medium">No verifications found</h3>
        <p className="text-sm text-muted-foreground max-w-[250px] mt-1">
          Recent verification activity will appear here once processed.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border bg-card overflow-x-auto">
      <Table className="min-w-[800px]">
        <TableHeader className="bg-secondary/30">
          <TableRow className="hover:bg-transparent">
            <TableHead>Submission ID</TableHead>
            <TableHead>Merchant</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Processed At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">{row.id}</TableCell>
              <TableCell>{row.merchant_name}</TableCell>
              <TableCell className="text-muted-foreground text-sm">{row.document_type}</TableCell>
              <TableCell className="text-muted-foreground text-sm">{formatTime(row.upload_time)}</TableCell>
              <TableCell>{getStatusBadge(row.status)}</TableCell>
              <TableCell className={`font-semibold ${getScoreColor(row.confidence_score)}`}>
                {row.confidence_score}%
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/report/${row.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 transition-colors hover:bg-primary/10 hover:text-primary">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View Report</span>
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="h-8 w-8 transition-colors hover:bg-secondary">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

