import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * The old project shipped the admin password inside the client JS bundle
 * (visible to anyone via devtools). Here the check happens entirely on
 * the server: the password lives in ADMIN_PASSWORD (env var, never sent
 * to the browser), and a random session token is stored in an httpOnly
 * cookie the client-side JS can't read either.
 */
export async function POST(req: Request) {
  const { password } = await req.json();
  const real = process.env.ADMIN_PASSWORD;

  if (!real) {
    return NextResponse.json({ error: "ADMIN_PASSWORD n'est pas configuré côté serveur." }, { status: 500 });
  }
  if (password !== real) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  const token = crypto.randomUUID();
  cookies().set("admin_session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 8, // 8h
    path: "/",
  });
  // NOTE: for a single-admin site, comparing the cookie's mere presence is
  // enough here. If you add real multi-user auth later, store `token`
  // server-side (Supabase table) and validate it instead of trusting any
  // cookie value blindly.
  return NextResponse.json({ ok: true });
}
