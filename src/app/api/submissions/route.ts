import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getSubmissions } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const adminIdFilter = searchParams.get('adminId');
    
    const role = user.user_metadata?.role;
    let filters: { verified_by?: string } = {};

    if (role === 'super_admin') {
      // Super admin can see all or filter by a specific admin
      if (adminIdFilter) {
        filters.verified_by = adminIdFilter;
      }
    } else {
      // Normal admins only see their own verifications
      filters.verified_by = user.id;
    }

    const submissions = await getSubmissions(filters);
    return NextResponse.json({ submissions });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
