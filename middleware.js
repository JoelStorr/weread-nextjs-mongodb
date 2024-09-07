import { updateSession } from "./lib/auth/udpateSession";
import { getSession } from "./lib/auth/tokenHandler";
import { NextResponse } from "next/server";

const protectedRoutes = ['/secret', "/books/search", "/books/lists", "/profile", "/profile/editor"]

export async function middleware(request) {
  
  if(!await getSession() && protectedRoutes.includes(request.nextUrl.pathname)){

    // TODO: Split URL be be able to block base part

    const absoluteURrl = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURrl.toString())
  }
  
  
  return await updateSession(request);

}


