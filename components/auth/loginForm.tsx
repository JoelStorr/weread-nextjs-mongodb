'use client'
import React, { ReactElement } from 'react'
import { useFormState } from "react-dom";
import { login } from "@/lib/auth/index";

export default function LoginForm(): ReactElement {

    const [state, formAction] = useFormState(login, { error: null });

  return (
    <>
      <form action={formAction}>
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <br />
        <button type="submit">Login</button>
      </form>

      {state.error && <p>{state.error}</p>}
    </>
  );
}
