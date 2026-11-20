'use client';

import { useState, type FormEvent } from 'react';
import { Check, CheckCheck, ChevronDown, Columns3, List, Plus, Star, Undo2 } from 'lucide-react';
import { formatDay, newTask, statuses, today, type Task } from '@/lib/dashboard/model';
import { belongsToDay, checklistItems, completedOn, orderTasks, toggleChecklist } from '@/lib/dashboard/model';

type Change = (task: Task, patch: Partial<Task>) => Promise<boolean>;

export function CompletionCheckbox({task,busy,onChange}:{task:Task;busy:boolean;onChange:Change}) {
  return <label className="gx-completion-control">
    <input type="checkbox" checked={task.status==='Hecho'} disabled={busy}
      aria-label={`${task.status==='Hecho'?'Reabrir':'Completar'} ${task.title}`}
      onChange={e=>void onChange(task,{status:e.target.checked?'Hecho':'Por hacer'})}/>
    <span className="gx-checkbox-face" aria-hidden="true"><Check size={15}/></span>
  </label>;
}

export function TaskRow({task,busy,onChange,onOpen}:{task:Task;busy:boolean;onChange:Change;onOpen:(task:Task)=>void}) {
  const steps=checklistItems(task.checklist);
  const day=today();
  const done=task.status==='Hecho';
  return <div className={`gx-task-row gx-task-v2 ${done?'is-complete':''}`}>
    <CompletionCheckbox task={task} busy={busy} onChange={onChange}/>
    <button type="button" className="gx-task-name" onClick={()=>onOpen(task)}>
      <strong>{task.title}</strong>
      <span className="gx-task-meta"><span>{task.client||'Por organizar'}</span>
        {task.status!=='Por hacer'&&<span className="gx-task-state">{task.status}</span>}
        {steps.length>0&&<span><CheckCheck size={13}/>{steps.filter(s=>s.checked).length}/{steps.length} pasos</span>}
        {task.dueDate&&!done&&<span className={task.dueDate<day?'gx-overdue':''}>Entrega {formatDay(task.dueDate)}</span>}
        {task.workDate&&task.workDate<day&&!done&&<span className="gx-overdue">Pendiente desde {formatDay(task.workDate)}</span>}
      </span>
    </button>
    {!done&&<button type="button" className={`gx-priority-toggle ${task.priority?'is-priority':''}`}
      aria-label={`${task.priority?'Quitar prioridad de':'Priorizar'} ${task.title}`} aria-pressed={task.priority}
      disabled={busy} onClick={()=>void onChange(task,{priority:!task.priority})}><Star size={17}/></button>}
  </div>;
}

export function Checklist({value,disabled,onChange,label='Pasos de la tarea'}:{value:string;disabled:boolean;onChange:(value:string)=>void;label?:string}) {
  const items=checklistItems(value);
  if(!items.length)return null;
  return <div className="gx-checklist" role="group" aria-label={label}>
    <div className="gx-checklist-heading"><strong>{label}</strong><span>{items.filter(i=>i.checked).length} de {items.length}</span></div>
    {items.map(item=><label key={item.index} className={item.checked?'is-checked':''}>
      <input type="checkbox" checked={item.checked} disabled={disabled} onChange={e=>onChange(toggleChecklist(value,item.index,e.target.checked))}/>
      <span>{item.text}</span>
    </label>)}
  </div>;
}

export function DailyTaskList({clients,tasks,busy,onChange,onOpen,onAdd}:{clients:string[];tasks:Task[];busy:boolean;onChange:Change;onOpen:(task:Task)=>void;onAdd:(task:Task)=>Promise<boolean>}) {
  const [filter,setFilter]=useState<'today'|'all'|'done'>('all');
  const [layout,setLayout]=useState<'board'|'list'>('board');
  const [mobileLane,setMobileLane]=useState<'Por hacer'|'En curso'|'Hecho'>('Por hacer');
  const [customer,setCustomer]=useState('');
  const [title,setTitle]=useState('');
  const [showCompleted,setShowCompleted]=useState(false);
  const day=today();
  const scoped=tasks.filter(t=>!customer||t.client===customer);
  const todays=scoped.filter(t=>belongsToDay(t,day));
  const done=todays.filter(t=>completedOn(t,day));
  const pending=orderTasks((filter==='today'?todays:scoped).filter(t=>t.status!=='Hecho'));
  const finished=scoped.filter(t=>t.status==='Hecho').sort((a,b)=>(b.completedAt||'').localeCompare(a.completedAt||''));
  async function add(event:FormEvent) {
    event.preventDefault(); if(!title.trim()||busy)return;
    const task={...newTask(title.trim()),client:customer,workDate:filter==='today'?day:''};
    if(await onAdd(task))setTitle('');
  }
  const render=(task:Task)=><TaskRow key={task.id} task={task} busy={busy} onChange={onChange} onOpen={onOpen}/>;
  const boardTasks=filter==='today'?todays:filter==='done'?finished:scoped;
  const lanes=[{title:'Por hacer',status:'Por hacer'},{title:'En curso',status:'En curso'},{title:'Hecho',status:'Hecho'}] as const;
  return <section className={`gx-daily-list gx-layout-${layout}`} aria-labelledby="gx-list-title">
    <div className="gx-section-heading"><h2 id="gx-list-title">Mi tablero</h2><div className="gx-view-switch" role="group" aria-label="Vista de tareas"><button type="button" aria-label="Ver tablero" aria-pressed={layout==='board'} onClick={()=>setLayout('board')}><Columns3 size={18}/></button><button type="button" aria-label="Ver lista" aria-pressed={layout==='list'} onClick={()=>setLayout('list')}><List size={18}/></button></div></div>
    <label className="gx-client-filter"><span className="sr-only">Filtrar tareas por cliente</span><select value={customer} onChange={e=>setCustomer(e.target.value)}><option value="">Todos los clientes</option>{clients.map(c=><option key={c}>{c}</option>)}</select></label>
    <div className="gx-list-toolbar" role="group" aria-label="Mostrar tareas">
      {([['today','Hoy',todays.filter(t=>t.status!=='Hecho').length],['all','Todo',scoped.length],['done','Hechas',finished.length]] as const).map(([key,label,count])=><button key={key} type="button" aria-pressed={filter===key} className={filter===key?'selected':''} onClick={()=>setFilter(key)}>{label}<span>{count}</span></button>)}
    </div>
    {filter==='today'&&<div className="gx-day-progress"><span>{done.length?`${done.length} ${done.length===1?'tarea terminada':'tareas terminadas'} hoy`:'Cada tarea terminada cuenta.'}</span><span>{done.length}/{todays.length}</span><progress aria-label="Progreso de las tareas de hoy" value={done.length} max={Math.max(1,todays.length)}/></div>}
    {layout==='board'&&filter!=='done'&&<div className="gx-mobile-lanes" role="group" aria-label="Columna del tablero">
      {lanes.map(lane=><button key={lane.status} type="button" aria-pressed={mobileLane===lane.status} onClick={()=>setMobileLane(lane.status)}>{lane.title}</button>)}
    </div>}
    {layout==='board'&&filter!=='done'?<div className="gx-kanban" role="region" aria-label="Tablero por estados">
      {lanes.map(lane=>{
        const items=orderTasks(boardTasks.filter(task=>lane.status==='En curso'?['En curso','En revisión','En espera'].includes(task.status):task.status===lane.status));
        return <section key={lane.status} className={`gx-kanban-lane ${lane.status==='Hecho'?'is-done-lane':''} ${mobileLane===lane.status?'is-mobile-lane':''}`} aria-label={lane.title}>
          <header><h3>{lane.title}</h3><span>{items.length}</span></header>
          {lane.status==='En curso'&&<p className="sr-only">Incluye tareas en revisión y en espera.</p>}
          <div className="gx-lane-tasks">{items.map(task=><article key={task.id} className={`gx-kanban-card ${task.status==='Hecho'?'is-complete':''}`}>
            {render(task)}
            {task.next&&task.status!=='Hecho'&&<p className="gx-card-next">{task.next}</p>}
            <label className="gx-move-task"><span className="sr-only">Mover {task.title} a</span><select aria-label={`Mover ${task.title} a`} value={task.status} disabled={busy} onChange={e=>void onChange(task,{status:e.target.value as Task['status']})}>{statuses.map(status=><option key={status}>{status}</option>)}</select></label>
          </article>)}</div>
          {!items.length&&<p className="gx-lane-empty">{lane.status==='Hecho'?'Tus tareas terminadas aparecerán aquí.':lane.status==='En curso'?'Mueve aquí lo que estás trabajando.':'Sin tareas por empezar.'}</p>}
          {lane.status!=='Hecho'&&<button className="gx-lane-add" type="button" onClick={()=>onOpen({...newTask(),client:customer,status:lane.status,workDate:filter==='today'?day:''})}><Plus size={16}/>Agregar tarea</button>}
        </section>;
      })}
    </div>:<div className="gx-task-list-body">
      {(filter==='done'?finished:pending).map(render)}
      {!(filter==='done'?finished:pending).length&&<div className="gx-list-empty"><CheckCheck size={24}/><h3>{filter==='done'?'Aquí verás lo que termines':filter==='today'?'Tu lista de hoy está libre':'No hay pendientes en esta lista'}</h3><p>{filter==='done'?'Marca el checkbox de una tarea para completarla. Puedes reabrirla cuando lo necesites.':'Agrega una tarea abajo o revisa Pendientes para elegir tu siguiente paso.'}</p></div>}
    </div>}
    {filter!=='done'&&<form className="gx-inline-capture" onSubmit={add}><Plus size={18}/><input aria-label="Nueva tarea en mi lista" placeholder={filter==='today'?'¿Qué quieres hacer hoy?':'Agrega un pendiente…'} maxLength={200} value={title} onChange={e=>setTitle(e.target.value)} disabled={busy}/><button className="gx-primary" type="submit" disabled={busy||!title.trim()}>Agregar</button></form>}
    {layout==='list'&&filter==='today'&&done.length>0&&<div className="gx-completed-today"><button className="gx-completed-heading" type="button" aria-expanded={showCompleted} onClick={()=>setShowCompleted(!showCompleted)}><ChevronDown size={17}/>{showCompleted?'Ocultar':'Ver'} terminadas hoy ({done.length})</button>{showCompleted&&done.map(render)}</div>}
  </section>;
}

export function CompletionUndo({title,busy,onUndo}:{title:string;busy:boolean;onUndo:()=>void}) {
  return <div className="gx-completion-toast"><CheckCheck size={18}/><span>Tarea completada: <strong>{title}</strong></span><button type="button" disabled={busy} onClick={onUndo}><Undo2 size={16}/>Deshacer</button></div>;
}
