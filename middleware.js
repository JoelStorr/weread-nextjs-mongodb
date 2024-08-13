import { updateSession } from "./lib/auth/udpateSession";
import { getSession } from "./lib/auth/tokenHandler";
import { NextResponse } from "next/server";

const protectedRoutes = ['/secret']

export async function middleware(request) {
  
  if(!await getSession() && protectedRoutes.includes(request.nextUrl.pathname)){
    const absoluteURrl = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURrl.toString())
  }
  
  
  return await updateSession(request);



}


