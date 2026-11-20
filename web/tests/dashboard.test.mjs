import test from 'node:test';
import assert from 'node:assert/strict';
import { emptyWorkspace, generateOccurrences, nextOccurrence, workspaceSchema, weekDays } from '../src/lib/dashboard/model.ts';
import { hasClient, workspaceClients, belongsToDay, checklistItems, completedOn, newTask, orderTasks, toggleChecklist, withTaskStatus } from '../src/lib/dashboard/model.ts';

test('custom clients survive a workspace round trip and are checked against existing names',()=>{
  const old = workspaceSchema.parse(emptyWorkspace());
  assert.deepEqual(workspaceClients(old), ['Ecopests','Caycer','RP Carpintería','GX1']);
  const workspace = workspaceSchema.parse(JSON.parse(JSON.stringify({...old,customClients:['Estudio Norte','CÁYCER']})));
  assert.deepEqual(workspaceClients(workspace), [...workspaceClients(old),'Estudio Norte']);
  assert.equal(hasClient(workspace,' estudio norte '),true);
  assert.equal(hasClient(workspace,'Norte'),false);
});

test('checklists preserve legacy steps, duplicate text and empty lines',()=>{
  const legacy='Revisar\n\nRevisar\n- [X] Aprobado\n* Enviar';
  assert.deepEqual(checklistItems(legacy).map(s=>[s.index,s.text,s.checked]),[[0,'Revisar',false],[2,'Revisar',false],[3,'Aprobado',true],[4,'Enviar',false]]);
  const changed=toggleChecklist(legacy,2,true);
  assert.equal(changed,'Revisar\n\n- [x] Revisar\n- [X] Aprobado\n* Enviar');
  assert.equal(checklistItems(toggleChecklist(changed,2,false))[1].checked,false);
  assert.equal(toggleChecklist(legacy,99,true),legacy);
});
test('completion records the actual moment, editing done retains it, reopening clears it',()=>{
  const task=newTask('Entregar');
  const done=withTaskStatus(task,'Hecho',new Date('2026-11-20T02:00:00Z'));
  assert.equal(done.completedAt,'2026-11-20T02:00:00.000Z');
  assert.equal(completedOn(done,'2026-11-19'),true);
  assert.equal(completedOn(done,'2026-11-20'),false);
  assert.equal(withTaskStatus(done,'Hecho').completedAt,done.completedAt);
  assert.equal(withTaskStatus(done,'En curso').completedAt,'');
  assert.equal(task.status,'Por hacer');
});
test('old completed tasks have no invented completion date and still validate',()=>{
  const task={...newTask('Anterior'),status:'Hecho'};
  assert.equal(completedOn(task,'2026-11-19'),false);
  const workspace=emptyWorkspace();workspace.tasks.push(task);
  assert.equal(workspaceSchema.safeParse(workspace).success,true);
});
test('today includes overdue work and due reviews, not future priorities',()=>{
  const task=newTask('Trabajo');const day='2026-11-19';
  assert.equal(belongsToDay({...task,priority:true,workDate:'2026-11-21'},day),false);
  assert.equal(belongsToDay({...task,workDate:'2026-11-18'},day),true);
  assert.equal(belongsToDay({...task,reviewDate:day},day),true);
  assert.equal(belongsToDay({...task,dueDate:day},day),true);
  assert.equal(belongsToDay(task,day),false);
});
test('sorting does not mutate the saved task order',()=>{
  const tasks=[{...newTask('B'),dueDate:'2026-11-20'},{...newTask('A'),priority:true}];
  assert.equal(orderTasks(tasks)[0].title,'A');assert.equal(tasks[0].title,'B');
});
test('weekly occurrences are idempotent and retain overdue tasks',()=>{const s=emptyWorkspace();s.routines.push({id:'weekly',title:'Revisar',client:'GX1',frequency:'weekly',nextDate:'2026-11-02',paused:false});const first=generateOccurrences(s,'2026-11-15');assert.equal(first.tasks.length,2);assert.deepEqual(first.tasks.map(t=>t.workDate),['2026-11-02','2026-11-09']);assert.deepEqual(generateOccurrences(first,'2026-11-15'),first);assert.equal(s.tasks.length,0);});
test('paused routine generates no tasks',()=>{const s=emptyWorkspace();s.routines.push({id:'paused',title:'Revisar',client:'GX1',frequency:'weekly',nextDate:'2026-11-02',paused:true});assert.equal(generateOccurrences(s,'2026-11-15').tasks.length,0);});
test('monthly recurrence does not skip February',()=>{assert.equal(nextOccurrence('2027-01-31','monthly'),'2027-02-28');assert.equal(nextOccurrence('2028-01-31','monthly'),'2028-02-29');});
test('week includes weekend without date-zone shifts',()=>{assert.deepEqual(weekDays('2026-11-15'),['2026-11-09','2026-11-10','2026-11-11','2026-11-12','2026-11-13','2026-11-14','2026-11-15']);});
test('reject malformed workspace and impossible date',()=>{assert.equal(workspaceSchema.safeParse({tasks:[]}).success,false);const s=emptyWorkspace();s.routines.push({id:'bad',title:'Test',client:'GX1',frequency:'weekly',nextDate:'2026-02-31',paused:false});assert.equal(workspaceSchema.safeParse(s).success,false);});
