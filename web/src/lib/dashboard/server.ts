import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function configured() { return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY && process.env.DASHBOARD_OWNER_EMAIL); }
export async function supabaseServer() {
  if(!configured()) throw new Error('Conexión privada pendiente de configurar.');
  const jar=await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,{ cookies:{ getAll:()=>jar.getAll(), setAll:(items)=>{ try { items.forEach(({name,value,options})=>jar.set(name,value,options)); } catch { /* Server Component: refresh occurs in route handlers. */ } } } });
}
export async function authorized() {
  const db=await supabaseServer(); const {data:{user},error}=await db.auth.getUser();
  if(error || !user || !user.email_confirmed_at || user.email?.toLowerCase()!==process.env.DASHBOARD_OWNER_EMAIL?.toLowerCase()) throw new Error('Inicia sesión con tu cuenta autorizada.');
  const {data:member}=await db.from('dashboard_members').select('user_id').eq('user_id',user.id).maybeSingle();
  if(!member) throw new Error('La cuenta aún no tiene acceso al espacio.');
  return {db,user};
}
export function sameOrigin(request: Request) { const origin=request.headers.get('origin'); return origin===new URL(request.url).origin; }
export function privateJson(body:unknown,status=200) { return Response.json(body,{status,headers:{'Cache-Control':'private, no-store'}}); }
