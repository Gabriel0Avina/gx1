import { authorized, privateJson, sameOrigin } from '@/lib/dashboard/server';
import { emptyWorkspace, workspaceSchema } from '@/lib/dashboard/model';
import { z } from 'zod';

export async function GET() { try { const {db,user}=await authorized(); const {data,error}=await db.from('dashboard_workspaces').select('data,revision').eq('user_id',user.id).maybeSingle(); if(error) return privateJson({error:'No se pudo leer tu espacio. Intenta de nuevo.'},503); return privateJson(data || {data:emptyWorkspace(),revision:0}); } catch { return privateJson({error:'Inicia sesión para acceder a tu espacio.'},401); } }
export async function PUT(request: Request) {
  if(!sameOrigin(request)) return privateJson({error:'Solicitud no autorizada.'},403);
  try { const {db}=await authorized(); const raw=await request.text(); if(raw.length>2000000) return privateJson({error:'El espacio supera el tamaño permitido.'},413); const parsed=z.object({revision:z.number().int().nonnegative(),data:workspaceSchema}).safeParse(JSON.parse(raw)); if(!parsed.success) return privateJson({error:'Revisa los campos y las fechas.'},400);
    const {data,error}=await db.rpc('save_dashboard_workspace',{expected_revision:parsed.data.revision,next_data:parsed.data.data});
    if(error) return privateJson({error:error.message.includes('revision_conflict')?'Tu espacio cambió en otra pestaña. Descarga tus cambios antes de recargar.':'No se guardaron los cambios. Intenta de nuevo.'},error.message.includes('revision_conflict')?409:503);
    return privateJson({revision:data});
  } catch { return privateJson({error:'No se pudo guardar. Revisa tu sesión y vuelve a intentarlo.'},401); }
}
