import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

const ALLOWED_ORIGINS = [
  "https://zerotoaiagents.com",
  "https://www.zerotoaiagents.com",
  "https://zerotowp.com",
  "https://www.zerotowp.com",
  "http://localhost:3000",
  "http://localhost:3001",
];

function getCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("Origin") || "";
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "origin",
  };
}

http.route({
  path: "/subscribe",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    const { email, site, locale } = body;

    if (!email || !site) {
      return new Response(
        JSON.stringify({ success: false, message: "email and site are required" }),
        { status: 400, headers: { ...getCorsHeaders(request), "Content-Type": "application/json" } }
      );
    }

    const result = await ctx.runMutation(api.emails.subscribe, {
      email,
      site,
      locale: locale || "en",
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...getCorsHeaders(request), "Content-Type": "application/json" },
    });
  }),
});

http.route({
  path: "/subscribe",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => {
    return new Response(null, {
      status: 204,
      headers: getCorsHeaders(request),
    });
  }),
});

http.route({
  path: "/unsubscribe",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    const { email, site } = body;

    if (!email || !site) {
      return new Response(
        JSON.stringify({ success: false, message: "email and site are required" }),
        { status: 400, headers: { ...getCorsHeaders(request), "Content-Type": "application/json" } }
      );
    }

    const result = await ctx.runMutation(api.emails.unsubscribe, { email, site });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...getCorsHeaders(request), "Content-Type": "application/json" },
    });
  }),
});

http.route({
  path: "/unsubscribe",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => {
    return new Response(null, {
      status: 204,
      headers: getCorsHeaders(request),
    });
  }),
});

export default http;
