import { redirect } from "next/navigation";
import { getSession, login, logout } from "@/lib/auth/index";

export default async function Login() {
  const session = await getSession();
  return (
    <section>
      <form
        action={async (formData) => {
          "use server";
          await login(formData);
          // redirect("/");
        }}
      >
        <input type="email" placeholder="Email" name="email"/>
        <input type="password" placeholder="Password" name="password"/>
        <br />
        <button type="submit">Login</button>
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
