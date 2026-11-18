import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/dashboard/server';
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const tokenHash = url.searchParams.get('token_hash');
  const type = url.searchParams.get('type');
  try {
    const db = await supabaseServer();
    const result = code
      ? await db.auth.exchangeCodeForSession(code)
      : tokenHash && (type === 'email' || type === 'invite')
        ? await db.auth.verifyOtp({ token_hash: tokenHash, type })
        : null;
    if (result && !result.error) {
      if (result.data.user?.email?.toLowerCase() === process.env.DASHBOARD_OWNER_EMAIL?.toLowerCase()) {
        const response = NextResponse.redirect(new URL('/dashboard', url.origin));
        response.headers.set('Cache-Control', 'private, no-store');
        response.headers.set('Referrer-Policy', 'no-referrer');
        return response;
      }
      await db.auth.signOut();
    }
  } catch { /* Show a recoverable error instead of leaking provider details. */ }
  const response = NextResponse.redirect(new URL('/login?error=expired', url.origin));
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Referrer-Policy', 'no-referrer');
  return response;
}
