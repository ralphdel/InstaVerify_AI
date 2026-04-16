import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Only run on routes that need auth protection:
     * - /dashboard (and sub-routes)
     * - /upload
     * - /report (and sub-routes)
     * - /login (to redirect already-authenticated users)
     * - /auth (password flows)
     */
    '/dashboard/:path*',
    '/upload/:path*',
    '/report/:path*',
    '/login',
    '/auth/:path*',
  ],
};
