"use server";

import { hashUserPassword } from "./hash";

import { redirect } from "next/dist/server/api-utils";
import { addUser } from "../mongo/auth";

// export async function signup(prevState, formData) {
//   const email = formData.get("email");
//   const password = formData.get("password");
//   const username = formData.get("username");

//   let errors = {};

//   if (!email.includes("@")) {
//     errors.email = "Pleas enter a valid email adress.";
//   }

//   if (password.trim().length < 8) {
//     errors.password = "Passwords must be at least 8 characters long.";
//   }

//   if(username.trim().length <= 3){
//     errors.username = "Your username has to be at least 3 Charcters long"
//   }

//   if (Object.keys(errors).length > 0) {
//     return {
//       errors,
//     };
//   }

//   // Hashes password
//   const hashedPassword = hashUserPassword(password);
//   // Makes sure that the email is unique
//   try {
//     // TODO: USE ADD USER FUNCTION FROM MONGO DB
//     const result = await addUser(email, hashedPassword, username)
//   } catch (error) {
//     if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
//       return {
//         errors: {
//           emails:
//             "It seems like an account for the chosen email already exists.",
//         },
//       };
//     }
//     throw error;
//   }

//   redirect("/training");
// }

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.TOKENSECRET;
const key = new TextEncoder().encode(secretKey);


// NOTE: Creates a token that works for 10 sec
export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}


// NOTE: Decrypt the token
export async function decrypt(input) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

// NOTE: Login existing user
export async function login(formData) {
  // Verify credentials && get the user

  const user = { email: formData.get("email"), name: "John" };

  //TODO: ADD db check


  // Create the session
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
}

// NOTE: Logout function that destrois the cookie
export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

//NOTE: Getting the session Token
export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

