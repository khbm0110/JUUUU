import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const form = await req.formData();
  const payload = {
    name: form.get("name"),
    email: form.get("email"),
    message: form.get("message"),
    created_at: new Date().toISOString(),
  };

  // If Supabase is connected, store it there; otherwise this still
  // succeeds — you'll want to wire up an email fallback (e.g. Resend)
  // for the case where the project isn't connected to a database yet.
  if (supabase) {
    await supabase.from("contact_messages").insert(payload);
  }

  return NextResponse.redirect(new URL("/?sent=1", req.url));
}
