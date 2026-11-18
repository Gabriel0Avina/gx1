-- Apply once in a new Supabase project. No real client data or identity in source.
create table public.dashboard_members (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.dashboard_members enable row level security;
create policy member_self on public.dashboard_members for select to authenticated using (user_id = (select auth.uid()));
revoke all on public.dashboard_members from anon, authenticated;
grant select on public.dashboard_members to authenticated;

create table public.dashboard_workspaces (user_id uuid primary key references public.dashboard_members(user_id) on delete cascade, data jsonb not null, revision integer not null default 1, updated_at timestamptz not null default now());
alter table public.dashboard_workspaces enable row level security;
create policy workspace_owner on public.dashboard_workspaces for all to authenticated using (user_id=(select auth.uid()) and exists(select 1 from public.dashboard_members where user_id=(select auth.uid()))) with check (user_id=(select auth.uid()) and exists(select 1 from public.dashboard_members where user_id=(select auth.uid())));
revoke all on public.dashboard_workspaces from anon, authenticated;
grant select on public.dashboard_workspaces to authenticated;

create function public.save_dashboard_workspace(expected_revision integer, next_data jsonb) returns integer language plpgsql security definer set search_path='' as $$
declare current_revision integer; owner_id uuid := auth.uid();
begin
 if owner_id is null or not exists(select 1 from public.dashboard_members where user_id=owner_id) then raise exception 'unauthorized'; end if;
 if jsonb_typeof(next_data)<>'object' or octet_length(next_data::text)>2000000 then raise exception 'invalid_document'; end if;
 if not(next_data ?& array['tasks','projects','materials','routines','history']) then raise exception 'invalid_document'; end if;
 perform pg_advisory_xact_lock(hashtextextended(owner_id::text,0));
 select revision into current_revision from public.dashboard_workspaces where user_id=owner_id for update;
 if coalesce(current_revision,0)<>expected_revision then raise exception 'revision_conflict'; end if;
 insert into public.dashboard_workspaces(user_id,data,revision) values(owner_id,next_data,1)
 on conflict(user_id) do update set data=excluded.data,revision=public.dashboard_workspaces.revision+1,updated_at=now() returning revision into current_revision;
 return current_revision;
end; $$;
revoke all on function public.save_dashboard_workspace(integer,jsonb) from public, anon;
grant execute on function public.save_dashboard_workspace(integer,jsonb) to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('dashboard-files','dashboard-files',false,3145728,array['application/pdf','image/png','image/jpeg','image/webp','text/plain']) on conflict(id) do nothing;
create policy dashboard_file_read on storage.objects for select to authenticated using(bucket_id='dashboard-files' and (storage.foldername(name))[1]=(select auth.uid())::text and exists(select 1 from public.dashboard_members where user_id=(select auth.uid())));
create policy dashboard_file_insert on storage.objects for insert to authenticated with check(bucket_id='dashboard-files' and (storage.foldername(name))[1]=(select auth.uid())::text and exists(select 1 from public.dashboard_members where user_id=(select auth.uid())));
-- No update/delete policy: previous file versions remain intact.
