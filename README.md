# ProvenanceOS Sample Registry MVP

Mobile-first Next.js prototype for registering physical opal samples before Vanta/pXRF analysis.

## What works now
- Browser camera capture using `getUserMedia`
- Automatic human-readable sample IDs: `AND-000001`, etc.
- Sample metadata
- Up to 3 evidence photos
- Local demo persistence (so it runs immediately without Supabase credentials)
- QR code generated for each sample record
- Sample detail page
- Supabase-ready relational schema for samples, images, scans, pXRF results and raw files

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open the displayed localhost URL on a phone on the same network if you want to test the camera. Browser camera access requires HTTPS or localhost.

## Supabase

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Create a Storage bucket called `sample-images`.
4. Put the project URL and anon key into `.env.local`.
5. Replace the demo localStorage persistence in `app/new/page.tsx` with Supabase inserts/uploads. The data model is already defined for that migration.

## Next build step

Implement the Vanta ingestion service:

`Vanta CSV -> raw_files -> scans -> pxrf_results -> sample_id`

Do not modify the original Vanta export. Store it as immutable raw evidence and calculate a SHA-256 hash.
