-- Drop existing policies
drop policy if exists "Public profiles are viewable by everyone" on public.users;
drop policy if exists "Users can update own profile" on public.users;
drop policy if exists "Users can insert own profile" on public.users;

drop policy if exists "Users can view own progress" on public.game_progress;
drop policy if exists "Users can insert own progress" on public.game_progress;
drop policy if exists "Users can update own progress" on public.game_progress;

drop policy if exists "Users can view own upgrades" on public.upgrades;
drop policy if exists "Users can insert own upgrades" on public.upgrades;
drop policy if exists "Users can update own upgrades" on public.upgrades;

drop policy if exists "Users can view own achievements" on public.achievements;
drop policy if exists "Users can insert own achievements" on public.achievements;
drop policy if exists "Users can update own achievements" on public.achievements;

drop policy if exists "Users can view own stats" on public.lifetime_stats;
drop policy if exists "Users can insert own stats" on public.lifetime_stats;
drop policy if exists "Users can update own stats" on public.lifetime_stats;

drop policy if exists "Anyone can view leaderboard" on public.leaderboard;
drop policy if exists "Users can insert own leaderboard" on public.leaderboard;
drop policy if exists "Users can update own leaderboard" on public.leaderboard;

-- Drop existing tables in reverse order to avoid foreign key conflicts
drop table if exists public.leaderboard cascade;
drop table if exists public.lifetime_stats cascade;
drop table if exists public.achievements cascade;
drop table if exists public.upgrades cascade;
drop table if exists public.game_progress cascade;
drop table if exists public.users cascade;

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Create tables with proper constraints
create table if not exists public.users (
  id uuid references auth.users primary key,
  username text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint users_username_key unique (username)
);

create table if not exists public.game_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  clicks bigint default 0,
  click_value bigint default 1,
  cps bigint default 0,
  prestige_currency bigint default 0,
  prestige_level integer default 0,
  prestige_requirement bigint default 1000,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint game_progress_user_id_key unique (user_id)
);

create table if not exists public.upgrades (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  tier_upgrades jsonb default '[]'::jsonb,
  sword_upgrades jsonb default '[]'::jsonb,
  summon_upgrades jsonb default '[]'::jsonb,
  artifacts jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint upgrades_user_id_key unique (user_id)
);

create table if not exists public.achievements (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  achievements jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint achievements_user_id_key unique (user_id)
);

create table if not exists public.lifetime_stats (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  total_clicks bigint default 0,
  total_coins bigint default 0,
  total_prestiges integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint lifetime_stats_user_id_key unique (user_id)
);

create table if not exists public.leaderboard (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  username text not null,
  total_coins bigint default 0,
  prestige_level integer default 0,
  achievements_earned integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint leaderboard_user_id_key unique (user_id),
  constraint leaderboard_username_key unique (username)
);

-- Enable RLS
alter table public.users enable row level security;
alter table public.game_progress enable row level security;
alter table public.upgrades enable row level security;
alter table public.achievements enable row level security;
alter table public.lifetime_stats enable row level security;
alter table public.leaderboard enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone"
  on public.users for select
  using (true);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.users for insert
  with check (auth.uid() = id);

-- Game progress policies
create policy "Users can view own progress"
  on public.game_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.game_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.game_progress for update
  using (auth.uid() = user_id);

-- Similar policies for other tables...