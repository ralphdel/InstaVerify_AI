import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const adminIdFilter = searchParams.get('adminId');
    const searchQuery = searchParams.get('q');
    
    const role = user.user_metadata?.role;
    let query = supabase.from("submissions").select("*");

    if (role === 'super_admin') {
      // Super admin can see all or filter by a specific admin
      if (adminIdFilter) {
        query = query.eq("verified_by", adminIdFilter);
      }
    } else {
      // Normal admins only see their own verifications
      query = query.eq("verified_by", user.id);
    }

    if (searchQuery) {
      // Case-insensitive search on merchant_name or submission id
      query = query.or(`merchant_name.ilike.%${searchQuery}%,id.ilike.%${searchQuery}%`);
    }

    const { data: submissions, error } = await query.order("upload_time", { ascending: false });
    if (error) throw error;

    return NextResponse.json({ submissions: submissions || [] });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
