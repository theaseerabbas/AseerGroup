# The Aseer Group Backend

Centralized Node.js + Express 5 + TypeScript + Prisma backend for The Aseer Group ecosystem (parent site, Aseer Transport Services, Aseer Travel & Tours, The Rise, and the Admin Portal).

## Stack
- **Runtime:** Node.js 22 + Express 5 + TypeScript
- **ORM & Database:** Prisma + Supabase PostgreSQL (`DATABASE_URL` & `DIRECT_URL` in `.env`)
- **Validation & Security:** Zod, Helmet, CORS

## Database Commands
- `npm run db:generate` — Generate Prisma Client
- `npm run db:push` — Push schema changes to PostgreSQL
- `npm run db:migrate` — Create and apply migrations
- `npm run db:seed` — Upsert core subsidiaries (`parent`, `transport`, `travel`, `the-rise`)
- `npm run db:studio` — Open Prisma Studio

## Development & Build
- `npm run dev` — Start dev server with `tsx watch`
- `npm run typecheck` — Run `tsc --noEmit`
- `npm run build` — Compile TypeScript to `dist/`
- `npm start` — Run compiled production server

## API v1 Endpoints
- `GET /api/v1/health` — Database connectivity & health check
- `GET /api/v1/subsidiaries` — List active subsidiaries & services
- `GET /api/v1/subsidiaries/:slug` — Fetch a single subsidiary
- `POST /api/v1/inquiries` — Submit multi-type inquiries (`GENERAL`, `PARTNERSHIP`, `TRANSPORT_BOOKING`, `TRAVEL_PACKAGE`, `CORPORATE_SALES`, `SUPPORT`, `OTHER`)
- `POST /api/v1/careers` — Submit career application with `resumeUrl` & optional `portfolioUrl`
- `POST /api/v1/pitches` — Submit venture pitch with optional `proposalUrl`
