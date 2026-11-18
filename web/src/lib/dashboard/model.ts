import { z } from 'zod';

const text = z.string().max(10000);
const id = z.string().min(1).max(100);
const date = z.union([z.literal(''), z.iso.date()]);
export const statuses = ['Por hacer', 'En curso', 'En revisión', 'En espera', 'Hecho'] as const;
export const taskSchema = z.object({ id, title: z.string().min(1).max(200), client: text, project: text, status: z.enum(statuses), workDate: date, dueDate: date, priority: z.boolean(), advance: text, next: text, checklist: text, reviewDate: date, evidence: text, waiting: text });
export const projectSchema = z.object({ id, client: text, name: z.string().min(1).max(200), objective: text, next: text, reviewDate: date, archived: z.boolean() });
export const materialSchema = z.object({ id, client: text, project: text, name: z.string().min(1).max(200), url: z.string().max(2000), path: text, version: z.number().int().positive(), group: id, status: z.enum(['Borrador', 'Por revisar', 'Validado', 'Sustituido']), createdAt: text });
export const routineSchema = z.object({ id, client: text, title: z.string().min(1).max(200), frequency: z.enum(['weekly', 'monthly']), nextDate: z.iso.date(), paused: z.boolean() });
export const workspaceSchema = z.object({ tasks: z.array(taskSchema).max(5000), projects: z.array(projectSchema).max(500), materials: z.array(materialSchema).max(5000), routines: z.array(routineSchema).max(500), history: z.array(z.object({ id, client: text, text, at: text })).max(5000) });
export type Task = z.infer<typeof taskSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Material = z.infer<typeof materialSchema>;
export type Routine = z.infer<typeof routineSchema>;
export type Workspace = z.infer<typeof workspaceSchema>;
export const clients = ['Ecopests', 'Caycer', 'RP Carpintería', 'GX1'];
export const emptyWorkspace = (): Workspace => ({ tasks: [], projects: [], materials: [], routines: [], history: [] });
export function today(date = new Date()) { return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Mexico_City', year:'numeric',month:'2-digit',day:'2-digit' }).format(date); }
export function addDays(day: string, count: number) { const d = new Date(day+'T12:00:00Z'); d.setUTCDate(d.getUTCDate()+count); return d.toISOString().slice(0,10); }
export function weekDays(day: string) { const offset=(new Date(day+'T12:00:00Z').getUTCDay()+6)%7; return Array.from({length:7},(_,i)=>addDays(day,i-offset)); }
export function formatDay(day: string, options: Intl.DateTimeFormatOptions = { day:'numeric',month:'short' }) { return day ? new Intl.DateTimeFormat('es-MX',{...options,timeZone:'UTC'}).format(new Date(day+'T12:00:00Z')) : 'Sin fecha'; }
export function newTask(title = ''): Task { return { id:crypto.randomUUID(),title,client:'',project:'',status:'Por hacer',workDate:'',dueDate:'',priority:false,advance:'',next:'',checklist:'',reviewDate:'',evidence:'',waiting:'' }; }
export function nextOccurrence(day: string, frequency: Routine['frequency']) { if(frequency==='weekly') return addDays(day,7); const d=new Date(day+'T12:00:00Z'); const n=d.getUTCDate(); d.setUTCDate(1); d.setUTCMonth(d.getUTCMonth()+1); const last=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate(); d.setUTCDate(Math.min(n,last)); return d.toISOString().slice(0,10); }
export function generateOccurrences(state: Workspace, through: string): Workspace { const result=structuredClone(state); for(const r of result.routines) { let count=0; while(!r.paused && r.nextDate<=through && count++<52) { const key=`routine:${r.id}:${r.nextDate}`; if(!result.tasks.some(t=>t.id===key)) result.tasks.push({...newTask(r.title),id:key,client:r.client,workDate:r.nextDate}); r.nextDate=nextOccurrence(r.nextDate,r.frequency); } } return result; }
export function demoWorkspace(): Workspace { const s=emptyWorkspace(); const day=today(); s.projects=[{id:'content',client:'Caycer',name:'Contenido de noviembre',objective:'Preparar y revisar el contenido de la semana.',next:'Ajustar los cierres de los guiones.',reviewDate:addDays(day,1),archived:false}]; s.tasks=[{...newTask('Revisar guiones de la semana'),id:'demo-1',client:'Caycer',project:'content',status:'En curso',priority:true,workDate:day,dueDate:addDays(day,1),advance:'Listos los temas. Falta ajustar los cierres.',next:'Revisar el guion 02 y definir su llamada a la acción.',checklist:'Revisar claridad del mensaje\nAjustar el cierre\nVerificar llamada a la acción'},{...newTask('Probar el formulario de servicios'),id:'demo-2',client:'Ecopests',priority:true,workDate:day,reviewDate:day},{...newTask('Definir el próximo contenido'),id:'demo-3',client:'GX1',priority:true,workDate:day},{...newTask('Revisar avances del sistema'),id:'demo-4',client:'RP Carpintería',status:'En revisión',workDate:addDays(day,1)},{...newTask('Idea para video de GX1'),id:'demo-5'},{...newTask('Revisar propuesta de seguimiento'),id:'demo-6'}]; s.history=[{id:'example',client:'Caycer',text:'Se definieron los temas y el siguiente paso.',at:new Date().toISOString()}]; return s; }

