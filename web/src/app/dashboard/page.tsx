import { redirect } from 'next/navigation';
import Dashboard from '@/components/dashboard/Dashboard';
import { authorized, configured } from '@/lib/dashboard/server';
import { emptyWorkspace, workspaceSchema } from '@/lib/dashboard/model';
export const dynamic='force-dynamic';
export default async function Page() {
 if(!configured()) redirect('/login');
 let context; try { context=await authorized(); } catch { redirect('/login'); }
 const {data,error}=await context.db.from('dashboard_workspaces').select('data,revision').eq('user_id',context.user.id).maybeSingle();
 if(error) throw new Error('No se pudo cargar tu espacio.');
 return <Dashboard initial={data?workspaceSchema.parse(data.data):emptyWorkspace()} initialRevision={data?.revision||0}/>;
}
