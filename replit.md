# Ann Clone

A landing page web application built as a monorepo with a React frontend, Node.js/Express API backend, and PostgreSQL database.

## Project Structure

- `artifacts/ann-clone/` — React 19 frontend (Vite, Tailwind CSS 4, Framer Motion, Radix UI)
- `artifacts/api-server/` — Express 5 API backend
- `artifacts/mockup-sandbox/` — UI component preview sandbox
- `lib/api-spec/` — OpenAPI YAML spec + Orval config
- `lib/api-zod/` — Generated Zod schemas from API spec
- `lib/api-client-react/` — Generated React Query hooks
- `lib/db/` — Drizzle ORM schema, migrations, and DB client

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion, Radix UI, Shadcn UI
- **Backend**: Node.js, Express 5, Pino logging
- **Database**: PostgreSQL via Drizzle ORM
- **Package Manager**: pnpm (monorepo workspace)

## Running the App

The main workflow (`Start application`) runs the frontend dev server:
```
export PATH=/nix/store/1lagpgadaybvs1n2312gysg2phjk89y8-nodejs-20.20.0-wrapped/bin:$PATH && \
/nix/store/61lr9izijvg30pcribjdxgjxvh3bysp4-pnpm-10.26.1/bin/pnpm install --force && \
cd artifacts/ann-clone && PORT=5000 pnpm run dev
```

## Key Notes

- pnpm and node binaries must be referenced by their full nix store paths in workflow commands (they are not in PATH by default in the workflow shell)
- `package.json` `packageManager` is set to `pnpm@10.26.1` to match the available nix store version (the original 10.33.0 caused self-upgrade failures)
- pnpm install requires `--force` flag when run in the workflow shell to avoid interactive prompts about module directory recreation
- Frontend runs on port 5000; backend (if used) should run on a different port (e.g. 3001)
- `DATABASE_URL` environment variable is set automatically by Replit's built-in PostgreSQL

## User Preferences
