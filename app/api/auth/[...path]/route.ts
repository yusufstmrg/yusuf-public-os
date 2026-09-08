import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

const unavailable = () =>
  new Response("Authentication is not configured for this deployment.", {
    status: 503,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });

const handlers = auth?.handler();

export const GET = handlers?.GET ?? unavailable;
export const POST = handlers?.POST ?? unavailable;
