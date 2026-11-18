import { useState } from 'react';
import { clients, newTask, today, type Task, type Workspace } from '@/lib/dashboard/model';

export function NoteCapture({demo, busy, save}:{demo:boolean;busy:boolean;save:(tasks:Task[])=>Promise<boolean>}) {
  const [note,setNote]=useState('');
  const [rows,setRows]=useState<Task[]>([]);
  const [loading,setLoading]=useState(false);
  const [message,setMessage]=useState('');
  const patch=(id:string, changes:Partial<Task>)=>setRows(current=>current.map(row=>row.id===id?{...row,...changes}:row));
  function split() {
    setRows(note.split(/\r?\n|;/).map(s=>s.trim()).filter(Boolean).map(title=>({...newTask(title),client:clients.find(c=>title.toLowerCase().includes(c.toLowerCase()))||''})));
    setMessage('');
  }
  async function organize() {
    setLoading(true); setMessage('');
    try {
      const result=await fetch('/api/dashboard/organize',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({note})});
      const body=await result.json();
      if (!result.ok) throw new Error(body.error);
      setRows(body.tasks.map((draft:Partial<Task>)=>({...newTask(),...draft})));
    } catch(e) {setMessage(e instanceof Error?e.message:'No se pudo organizar la nota.');}
    finally {setLoading(false);}
  }
  return <div className="gx-editor-form"><label>Nota de WhatsApp o texto libre<textarea rows={5} maxLength={6000} disabled={loading||rows.length>0} value={note} onChange={e=>setNote(e.target.value)}/></label>
    {!rows.length && <><small>{demo?'Prueba con una acción por línea.':'Organizar con IA envía solo esta nota al modelo a través de Vercel.'}</small><div className="gx-actions">
      {!demo&&<button className="gx-primary" disabled={loading||!note.trim()} onClick={organize}>{loading?'Organizando…':'Organizar con IA'}</button>}
      <button disabled={loading||!note.trim()} onClick={split}>Separar por líneas</button></div></>}
    {!!rows.length&&<form onSubmit={async e=>{e.preventDefault();if(!await save(rows))setMessage('No se guardó. Tus borradores siguen aquí.');}}>
    {rows.map((row,i)=><fieldset key={row.id} disabled={busy}><legend>Pendiente {i+1}</legend>
      <label>Acción<input required maxLength={200} value={row.title} onChange={e=>patch(row.id,{title:e.target.value})}/></label>
      <label>Cliente<select value={row.client} onChange={e=>patch(row.id,{client:e.target.value})}><option value="">Por organizar</option>{clients.map(c=><option key={c}>{c}</option>)}</select></label>
      <label>Estado<select value={row.status} onChange={e=>patch(row.id,{status:e.target.value as Task['status']})}><option>Por hacer</option><option>En espera</option></select></label>
      {row.status==='En espera'&&<label>En espera de<input required value={row.waiting} onChange={e=>patch(row.id,{waiting:e.target.value})}/></label>}
      {([['workDate','Trabajar el'],['dueDate','Entregar el'],['reviewDate','Revisar el']] as const).map(([key,label])=><label key={key}>{label}<input type="date" value={row[key]} onChange={e=>patch(row.id,{[key]:e.target.value})}/></label>)}
      <button type="button" onClick={()=>setRows(rows.filter(r=>r.id!==row.id))}>Quitar</button></fieldset>)}
      <button type="button" disabled={busy} onClick={()=>setRows([])}>Volver a la nota</button> <button className="gx-primary" disabled={busy}>Guardar pendientes ({rows.length})</button></form>}
    <p role="status">{message}</p></div>;
}

export function DailyChoices({data,open,choose}:{data:Workspace;open:(t:Task)=>void;choose:(t:Task)=>void}) {
  const day=today();
  function rank(t:Task) {
    if(t.status==='Hecho')return 0;
    if(t.status==='En espera')return t.reviewDate && t.reviewDate<=day?3:0;
    if(t.dueDate && t.dueDate<=day)return 5;
    if(t.reviewDate && t.reviewDate<=day)return 3;
    if(t.workDate && t.workDate<=day)return 2;
    return t.status==='En curso'||t.priority?1:0;
  }
  const choices=data.tasks.filter(t=>rank(t)>0).sort((a,b)=>rank(b)-rank(a)).slice(0,3);
  return <div className="gx-editor-form">{!choices.length&&<p>Aún no hay tareas programadas, en curso o pendientes de revisión.</p>}{choices.map(t=><section key={t.id}><small>{t.client} · {({0:'',5:'Entrega pendiente',3:'Toca dar seguimiento',2:'Trabajo programado',1:'Prioridad o trabajo en curso'})[rank(t)]}</small><h3>{t.title}</h3><button onClick={()=>open(t)}>Abrir tarea</button> {!t.priority&&<button onClick={()=>choose(t)}>Elegir como prioridad</button>}</section>)}</div>;
}

