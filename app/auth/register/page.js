// NOTE: Old code will delete no ts conversion needed
import { redirect } from "next/navigation";
import { signup, logout } from "/lib/auth/index";
import { getSession } from "/lib/auth/tokenHandler";

export default async function Login() {
  const session = await getSession();
  return (
    <section>
      <form
        action={async (formData) => {
          "use server";
          await signup(formData);
          // redirect("/");
        }}
      >
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <input type="text" placeholder="username" name="username" />
        <br />
        <button type="submit">Register</button>
      </form>
      <form
        action={async () => {
          "use server";
          await logout();
          redirect("/");
        }}
      >
        <button type="submit">Logout</button>
      </form>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </section>
  );
}
