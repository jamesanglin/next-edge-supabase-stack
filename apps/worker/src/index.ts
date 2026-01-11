import { createClient } from "@supabase/supabase-js";

export interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  SUPABASE_ANON_KEY: string;
}

function createServiceClient(env: Env) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function createAnonClient(env: Env, authHeader?: string) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: authHeader ? { headers: { Authorization: authHeader } } : undefined,
  });
}

export default {
  async fetch(
    request: Request,
    env: Env,
    _ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({ status: "ok" });
    }

    // Example: user-context endpoint
    if (url.pathname === "/api/me") {
      const authHeader = request.headers.get("Authorization");
      if (!authHeader) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }

      const supabase = createAnonClient(env, authHeader);
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        return Response.json({ error: "Invalid token" }, { status: 401 });
      }

      return Response.json({ user });
    }

    return new Response("Hello from Cloudflare Workers with Supabase!");
  },
};

// Export helper functions for use in other files
export { createServiceClient, createAnonClient };
