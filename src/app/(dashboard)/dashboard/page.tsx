import { MetricsCards } from "@/components/dashboard/MetricsCards";
import { DashboardTable } from "@/components/dashboard/DashboardTable";
import { createClient } from "@/utils/supabase/server";
import { AdminFilter } from "@/components/dashboard/AdminFilter";

export default async function DashboardPage(props: {
  searchParams: Promise<{ adminId?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const searchParams = await props.searchParams;
  
  const role = user?.user_metadata?.role;
  const adminIdFilter = searchParams.adminId;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Operator Dashboard</h2>
          <p className="text-muted-foreground">
            {role === 'super_admin' 
              ? "Overseeing all document verifications across the platform."
              : "Management of your assigned document verifications."}
          </p>
        </div>
        {role === 'super_admin' && <AdminFilter />}
      </div>
      
      <MetricsCards adminId={adminIdFilter} />
      
      <div>
        <h3 className="text-xl font-semibold tracking-tight mb-4 flex items-center gap-2">
          Submission History
          {adminIdFilter && (
            <span className="text-sm font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded">
              Filtered View
            </span>
          )}
        </h3>
        <DashboardTable adminId={adminIdFilter} />
      </div>
    </div>
  );
}

