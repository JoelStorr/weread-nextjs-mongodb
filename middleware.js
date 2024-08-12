import { updateSession } from "./lib/auth/udpateSession";

export async function middleware(request) {
  return await updateSession(request);
}


