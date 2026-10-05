create extension if not exists pgcrypto;

create table if not exists public.samples (
  id uuid primary key default gen_random_uuid(),
  sample_code text not null unique,
  sample_type text,
  location text,
  latitude double precision,
  longitude double precision,
  collection_date timestamptz,
  weight_g numeric,
  notes text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.sample_images (
  id uuid primary key default gen_random_uuid(),
  sample_id uuid not null references public.samples(id) on delete cascade,
  storage_path text not null,
  image_type text,
  created_at timestamptz not null default now()
);

create table if not exists public.scans (
  id uuid primary key default gen_random_uuid(),
  sample_id uuid not null references public.samples(id) on delete cascade,
  instrument_id text,
  scan_type text not null default 'pXRF',
  started_at timestamptz,
  completed_at timestamptz,
  status text not null default 'pending',
  source_file_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.pxrf_results (
  id uuid primary key default gen_random_uuid(),
  scan_id uuid not null references public.scans(id) on delete cascade,
  element text not null,
  value numeric,
  unit text,
  detection_limit numeric,
  raw_value text,
  created_at timestamptz not null default now()
);

create table if not exists public.raw_files (
  id uuid primary key default gen_random_uuid(),
  scan_id uuid references public.scans(id) on delete set null,
  filename text not null,
  storage_path text not null,
  sha256 text,
  created_at timestamptz not null default now()
);

-- Create a Storage bucket named 'sample-images' in the Supabase dashboard.
-- For production, add RLS policies appropriate to your auth model before exposing data.
