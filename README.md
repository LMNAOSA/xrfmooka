# ProvenanceOS UX V2 — Australian Provenance Project

This is a self-contained browser prototype focused on the Apple/Jony Ive direction: restrained typography, no monospace, dark mineral/glass surfaces, subtle glow, quiet motion, and the Australian Provenance Project as the master identity with ProvenanceOS as the system identity.

## Run

Python 3 is enough:

    python3 -m http.server 8787

Then open http://127.0.0.1:8787

Camera access works on localhost. On a deployed HTTPS domain it works on supported phones/browsers.

## Next production step

Replace the localStorage persistence with Supabase tables/storage, then connect the Vanta CSV ingestion layer to the sample IDs.
