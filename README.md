# Project Boilerplate

A modern full-stack TypeScript monorepo with Next.js, Cloudflare Workers, and shared UI components.

## Stack

- **Frontend:** Next.js 16, React 19, TailwindCSS v4
- **Backend:** Cloudflare Workers
- **Database:** Supabase (Auth, Database, Storage, Realtime)
- **UI:** shadcn/ui components
- **Testing:** Vitest, Playwright
- **Tooling:** pnpm, TypeScript, ESLint, Prettier

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy environment variables:
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   cp apps/worker/.env.example apps/worker/.dev.vars
   ```
3. Fill in your Supabase credentials

### Generate Database Types

```bash
pnpm supabase:types
```

### Usage

```tsx
// Server Component
import { createClient } from "@workspace/supabase/client/server";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
}

// Client Component
("use client");
import { createClient } from "@workspace/supabase/client/browser";

export default function Component() {
  const supabase = createClient();
}
```

## Project Structure

```
├── apps/
│   ├── web/          # Next.js frontend
│   └── worker/       # Cloudflare Workers API
├── packages/
│   ├── supabase/     # Shared Supabase clients
│   └── ui/           # Shared UI components
└── e2e/              # Playwright tests
```

## Scripts

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `pnpm dev`        | Start all apps in development |
| `pnpm dev:web`    | Start Next.js only            |
| `pnpm dev:worker` | Start Worker only             |
| `pnpm test`       | Run unit tests                |
| `pnpm test:e2e`   | Run E2E tests                 |
| `pnpm lint`       | Run ESLint                    |
| `pnpm typecheck`  | Run TypeScript checks         |
| `pnpm build`      | Build all apps                |
