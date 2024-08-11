'use client'
import { signup } from "@/lib/auth";
import {useActionState} from "react";


export default function Register() {

    const [state, formAction] = useActionState(signup, {error: null})


  return (
    <>
        <h3>Register</h3>
        <form >
            <label>
                Email
                <input type="mail"/>
            </label>
        </form>
    </>
  )
}
