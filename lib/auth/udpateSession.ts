"user server";
import { NextRequest, NextResponse } from "next/server";
import { encrypt, decrypt } from "./tokenHandler";


// NOTE: Update current Session
export async function updateSession(request) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + (1 * 60 * 60 * 1000));
  const res = NextResponse.next();
  
  //NOTE: Don't know why ts throws error
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
