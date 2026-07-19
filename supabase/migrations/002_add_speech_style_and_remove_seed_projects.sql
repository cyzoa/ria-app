-- Add speech style support for user profiles and remove seeded projects from existing accounts

alter table public.users
  add column if not exists speech_style text default 'formal';

alter table public.users
  add constraint users_speech_style_check
  check (speech_style in ('formal','casual'));

update public.users
set speech_style = coalesce(speech_style, 'formal')
where speech_style is null;

delete from public.projects
where name in ('STAR', 'LifeX', 'The Discovery', 'Decision AI', 'Family', 'Personal', 'Investment')
  and not exists (
    select 1 from public.tasks where public.tasks.project_id = public.projects.id
  );

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, preferred_name, speech_style)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'preferred_name', '오빠'), 'formal');

  return new;
end;
$$;
