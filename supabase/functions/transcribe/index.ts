import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const token = request.headers.get("Authorization") || "";
    if (!token.startsWith("Bearer ")) return json({error:"Sign in to use this service."},401);
    const client = createClient(Deno.env.get("SUPABASE_URL") || "", Deno.env.get("SUPABASE_ANON_KEY") || "", {global:{headers:{Authorization:token}}});
    const {data:identity,error:authError} = await client.auth.getUser();
    if (authError || !identity.user) return json({error:"Your session expired. Sign in again."},401);
    if (request.method !== "POST") return json({error:"POST required"},405);
    const form = await request.formData();
    const audio = form.get("audio");
    if (!(audio instanceof File)) {
      return json({ error: "An audio recording is required." }, 400);
    }

    if (audio.size > 8 * 1024 * 1024) return json({error:"Recording too large. Speak in shorter turns."},413);
    const apiKey = Deno.env.get("TRANSCRIBE_API_KEY") || Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return json({ error: "Voice transcription is not configured on the server." }, 503);
    }

    const body = new FormData();
    body.append("file", audio, audio.name || "recording.webm");
    body.append("model", Deno.env.get("TRANSCRIBE_MODEL") || "whisper-1");
    body.append("prompt", "Movie booking. Adult, student, senior and child tickets. Seats A1 through H12. Confirm booking, change seats, pay at venue, card payment.");
    body.append("language", "en");

    const response = await fetch(Deno.env.get("TRANSCRIBE_API_URL") || "https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body,
    });

    const result = await response.json();
    if (!response.ok) {
      return json({ error: result?.error?.message || "Transcription failed." }, response.status);
    }
    return json({ text: result.text || "" }, 200);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Transcription failed.";
    return json({ error: message }, 500);
  }
});

function json(body: Record<string, string>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
