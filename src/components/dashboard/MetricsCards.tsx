'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, Activity, AlertTriangle, Clock, Loader2 } from "lucide-react";

interface MetricsData {
  total: number;
  successRate: string;
  flagged: number;
  avgTime: string;
}

export function MetricsCards({ adminId }: { adminId?: string }) {
  const [data, setData] = useState<MetricsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      setIsLoading(true);
      try {
        const url = adminId 
          ? `/api/submissions/metrics?adminId=${adminId}`
          : '/api/submissions/metrics';
        const res = await fetch(url);
        const result = await res.json();
        if (res.ok) {
          setData(result);
        }
      } catch (err) {
        console.error('Failed to fetch metrics', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMetrics();
  }, [adminId]);

  const metrics = [
    {
      title: "Documents Verified",
      value: data?.total.toLocaleString() || "0",
      description: "Total submissions processed",
      icon: FileCheck,
      color: "text-primary"
    },
    {
      title: "Success Rate",
      value: data?.successRate || "0%",
      description: "Document approval accuracy",
      icon: Activity,
      color: "text-success"
    },
    {
      title: "Flagged Items",
      value: data?.flagged.toLocaleString() || "0",
      description: "Suspicious activities detected",
      icon: AlertTriangle,
      color: "text-destructive"
    },
    {
      title: "Avg. Processing Time",
      value: data?.avgTime || "0s",
      description: "AI extraction & validation",
      icon: Clock,
      color: "text-warning"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title} className="hover:shadow-md transition-all duration-200 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {metric.title}
            </CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color} opacity-70`} />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-baseline space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground/30" />
                <div className="h-7 w-16 bg-muted animate-pulse rounded" />
              </div>
            ) : (
              <div className="text-2xl font-bold tracking-tight">{metric.value}</div>
            )}
            <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-primary/40" />
              {metric.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

