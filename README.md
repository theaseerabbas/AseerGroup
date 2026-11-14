# The Aseer Group Corporate Web Ecosystem

Monorepo for **The Aseer Group** (`https://theaseergroup.com`) and its subsidiary web applications, centralized admin portal, shared Node.js backend, and Supabase database configuration.

## Repository Structure

```text
TheAseerGroup/
├── frontend/
│   ├── parent/        # The Aseer Group parent corporate website (theaseergroup.com)
│   ├── transport/     # Aseer Transport Services (transport.theaseergroup.com) — planned
│   ├── travel/        # Aseer Travel & Tours (travel.theaseergroup.com) — planned
│   ├── rise/          # The Rise (rise.theaseergroup.com) — planned
│   └── admin/         # Centralized Admin Portal (admin.theaseergroup.com) — planned
├── backend/           # Shared Node.js Backend API (api.theaseergroup.com) — planned
├── supabase/          # Supabase configuration & migrations — planned
├── docs/              # Product Requirements Document & company profiles
└── logos/             # Brand logos for The Aseer Group and subsidiaries
```

> **Note:** **The Leap Pakistan** (`https://theleappakistan.com/`) is already independently developed and hosted, and is linked from the parent website.

## Getting Started (Parent Website)

```bash
cd frontend/parent
npm install
npm run dev
```

Or from the repository root:

```bash
npm run dev:parent
npm run build:parent
npm run lint:parent
npm run test:parent
```

See [docs/PRD.md](./docs/PRD.md) for the full architecture and roadmap.