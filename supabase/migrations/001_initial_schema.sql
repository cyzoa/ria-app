-- RIA MVP v0.2 — Initial Schema
-- Run in Supabase SQL Editor or via supabase db push

-- Enums
create type task_priority as enum ('low', 'medium', 'high');
create type task_status as enum ('todo', 'doing', 'done', 'archived');

-- Users profile (extends auth.users)
create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  preferred_name text,
  nickname text,
  timezone text default 'Asia/Seoul',
  wake_time time,
  sleep_time time,
  created_at timestamptz default now() not null
);

-- Projects
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  name text not null,
  color text not null default '#C9A962',
  created_at timestamptz default now() not null
);

-- Tasks
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  project_id uuid references public.projects (id) on delete set null,
  title text not null,
  priority task_priority default 'medium' not null,
  status task_status default 'todo' not null,
  is_top3 boolean default false not null,
  due_date timestamptz,
  created_at timestamptz default now() not null,
  completed_at timestamptz
);

-- Inbox
create table public.inbox_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  content text not null,
  converted_to_task boolean default false not null,
  created_at timestamptz default now() not null
);

-- Notes
create table public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  content text not null,
  created_at timestamptz default now() not null
);

-- Discoveries
create table public.discoveries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  content text not null,
  tags text[] default '{}' not null,
  created_at timestamptz default now() not null
);

-- Evening Reviews
create table public.evening_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  date date not null,
  did_well text,
  learned text,
  tomorrow_plan text,
  created_at timestamptz default now() not null,
  unique (user_id, date)
);

-- North Star (daily focus — one per user per day)
create table public.north_stars (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  date date not null default current_date,
  title text not null,
  created_at timestamptz default now() not null,
  unique (user_id, date)
);

-- Indexes
create index idx_tasks_user_id on public.tasks (user_id);
create index idx_tasks_status on public.tasks (status);
create index idx_tasks_due_date on public.tasks (due_date);
create index idx_projects_user_id on public.projects (user_id);
create index idx_inbox_items_user_id on public.inbox_items (user_id);
create index idx_notes_user_id on public.notes (user_id);
create index idx_discoveries_user_id on public.discoveries (user_id);
create index idx_evening_reviews_user_id on public.evening_reviews (user_id);

-- Row Level Security
alter table public.users enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.inbox_items enable row level security;
alter table public.notes enable row level security;
alter table public.discoveries enable row level security;
alter table public.evening_reviews enable row level security;
alter table public.north_stars enable row level security;

-- RLS Policies: users can only access their own data
create policy "Users can view own profile" on public.users for select using (auth.uid() = id);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.users for insert with check (auth.uid() = id);

create policy "Users manage own projects" on public.projects for all using (auth.uid() = user_id);
create policy "Users manage own tasks" on public.tasks for all using (auth.uid() = user_id);
create policy "Users manage own inbox" on public.inbox_items for all using (auth.uid() = user_id);
create policy "Users manage own notes" on public.notes for all using (auth.uid() = user_id);
create policy "Users manage own discoveries" on public.discoveries for all using (auth.uid() = user_id);
create policy "Users manage own reviews" on public.evening_reviews for all using (auth.uid() = user_id);
create policy "Users manage own north stars" on public.north_stars for all using (auth.uid() = user_id);

-- Auto-create user profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, preferred_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'preferred_name', '오빠'));


  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
