// Supabase Edge Function: delete-account
// Deletes a Supabase Auth user securely with the service role key.
// Secures the request by verifying that the caller's JWT userId matches the userId in the request body.

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type DeleteAccountBody = {
  userId?: string;
};

serve(async (req: Request): Promise<Response> => {
  try {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) {
      return new Response("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY", {
        status: 500,
      });
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Extract token and resolve caller's user
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : undefined;

    if (!token) {
      return new Response("Missing Authorization bearer token", {
        status: 401,
      });
    }

    const caller = await adminClient.auth.getUser(token);
    if (caller.error || !caller.data?.user) {
      return new Response("Invalid or expired token", { status: 401 });
    }

    const callerUserId = caller.data.user.id;

    let bodyUserId: string | undefined;
    try {
      const body = (await req.json()) as DeleteAccountBody;
      bodyUserId = body?.userId;
    } catch (_) {
      // ignore, we'll fallback to callerUserId
    }

    const userIdToDelete = bodyUserId ?? callerUserId;

    // Ensure the caller can only delete themselves
    if (userIdToDelete !== callerUserId) {
      return new Response("Forbidden: cannot delete another user", {
        status: 403,
      });
    }

    const { error } = await adminClient.auth.admin.deleteUser(userIdToDelete);
    if (error) {
      return new Response(error.message ?? "Failed to delete user", {
        status: 500,
      });
    }

    return new Response("ok", { status: 200 });
  } catch (e) {
    const message =
      typeof e === "object" && e && "message" in e
        ? (e as any).message
        : String(e);
    return new Response(message, { status: 500 });
  }
});
