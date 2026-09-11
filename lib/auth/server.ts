import { createNeonAuth } from "@neondatabase/auth/next/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;

/**
 * Auth is configured only when the production environment provides the Neon
 * Auth endpoint and cookie secret. This keeps local/build environments safe
 * while the deployment gate is being completed.
 */
let configuredAuth = baseUrl && cookieSecret
  ? createNeonAuth({
      baseUrl,
      cookies: { secret: cookieSecret, sessionDataTtl: 300 },
    })
  : null;

if (!configuredAuth) {
  console.warn('[AI Studio] Auth not configured — using mock');
  configuredAuth = {
    handler: () => ({
      GET: () => new Response("Mock Auth API (GET)", { status: 200 }),
      POST: () => new Response("Mock Auth API (POST)", { status: 200 })
    }),
    getSession: async () => ({
      data: {
        session: { id: "mock-session" },
        user: { id: "00000000-0000-0000-0000-000000000000", name: "Mock User", email: "mock@example.com" }
      }
    })
  } as any;
}

export const auth = configuredAuth;
