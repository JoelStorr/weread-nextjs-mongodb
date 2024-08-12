"use server";

import { hashUserPassword, verifyPassword } from "./hash";

import { redirect } from "next/dist/server/api-utils";
import { addUser, getUser, getUserName } from "../mongo/auth";

export async function signup001(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");

  let errors = {};

  if (!email.includes("@")) {
    errors.email = "Pleas enter a valid email adress.";
  }

  if (password.trim().length < 8) {
    errors.password = "Passwords must be at least 8 characters long.";
  }

  if(username.trim().length <= 3){
    errors.username = "Your username has to be at least 3 Charcters long"
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  // Hashes password
  const hashedPassword = hashUserPassword(password);
  // Makes sure that the email is unique
  try {
    // TODO: USE ADD USER FUNCTION FROM MONGO DB
    const result = await addUser(email, hashedPassword, username)
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          emails:
            "It seems like an account for the chosen email already exists.",
        },
      };
    }
    throw error;
  }

  redirect("/training");
}


import { cookies } from "next/headers";
import { encrypt, decrypt } from "./tokenHandler";



// NOTE: Login existing user
export async function login(formData) {
  // Verify credentials && get the user

  const email = formData.get("email");
  const password = formData.get("password")
  

  //TODO: ADD db check

  const user = await getUser(email)

  console.log(user)
  

  const verifyedPassword = verifyPassword(user.password, password)



  if (verifyedPassword) {
    // Create the session
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
  }

}

// NOTE: Register new user 
//TODO: Register a new user
export async function signup(formData){
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");


  console.log(email)

  let errors = {};

  if (!email.includes("@")) {
    errors.email = "Pleas enter a valid email adress.";
  }

  if (password.trim().length < 8) {
    errors.password = "Passwords must be at least 8 characters long.";
  }

  if (username.trim().length <= 3) {
    errors.username = "Your username has to be at least 3 Charcters long";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  //Check if user exists
  const dbUser = await getUser(email);
  const dbUsername = await getUserName(username);

  console.log(dbUser);
  console.log(dbUsername);

  if(!dbUser.error){
    return {
      error: 'Email is already taken',
    }
  }

  if(!dbUsername.error){
    return{
      error: 'Username is already taken'
    }
  }

  // Hash password
  const hashedPassword = hashUserPassword(password);

  const newUser = await addUser(email, hashedPassword, username);

  console.log(newUser)

  if (!newUser.error) {
    // Create the session
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ username, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
  }



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

