

import Link from "next/link";
import { redirect } from "next/navigation";
import { delUser, logout } from "/lib/auth/index";
import { getSession } from "/lib/auth/tokenHandler";
import LoginForm from "/components/auth/loginForm";

export default async function Login() {
  

const session = await getSession();
  

  return (
    <section>
      <LoginForm />
      <form
        action={async () => {
          'use server'
          await logout();
          redirect("/");
        }}
      >
        <button type="submit">Logout</button>
      </form>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <form action={delUser}>
        <button type="submit">Delete User</button>
      </form>
      <p><Link href="/auth/register">Register</Link></p>
    </section>
  );
}
