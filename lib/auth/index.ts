"use server";

import { hashUserPassword, verifyPassword } from "./hash";
import { redirect } from "next/navigation";
import { addUser, deleteUser, getUser, getUserName } from "../mongo/auth";

export async function signup001(prevState, formData: FormData):Promise<{}> {
  let email = formData.get("email");
  let password = formData.get("password");
  let username = formData.get("username");

  email = email as string;
  password = password as string;
  username = username as string;

  let errors = {email, password, username};

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

  // Hashes password
  const hashedPassword = hashUserPassword(password);
  // Makes sure that the email is unique
  try {
    const result = await addUser(email, hashedPassword, username);
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
import { encrypt, decrypt, getSession } from "./tokenHandler";
import { UserInterface } from "@/types/types";

// NOTE: Login existing user
export async function login(prevState, formData) {
  // Verify credentials && get the user

  const email = formData.get("email");
  const password = formData.get("password");

  //TODO: ADD db check

  //TODO: Handle try Catch 

  const user = await getUser(email);

  console.log("-------------------- User -------------------------");
  console.log(user);
  if (user.error) {
    return { error: "There is no user" };
  }

  const verifyedPassword = verifyPassword(user.password, password);

  if (verifyedPassword) {
    // Create the session
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ user: user.email, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
    redirect("/")
    
  }

  return {};
}

// NOTE: Register new user
//TODO: Register a new user
export async function signup(formData: FormData): Promise<void> {
  let email = formData.get("email");
  let password = formData.get("password");
  let username = formData.get("username");

  email = email as string;
  password = password as string
  username = username as string

  // TODO: Input validation

  if (!email.includes("@")) {
    throw new Error( "Pleas enter a valid email adress.");
  }

  if (password.trim().length < 8) {
    throw new Error( "Passwords must be at least 8 characters long.");
  }

  if (username.trim().length <= 3) {
    throw new Error( "Your username has to be at least 3 Charcters long");
  }


  try{
    //Check if user exists
    const dbUser = await getUser(email);
    const dbUsername = await getUserName(username);

  } catch(error) {
    // TODO: Handle Error
    console.log(error);
    throw new Error("Email or Username is already taken")
    return;
  }

  let newUser: UserInterface;

  try{
    // Hash password
    const hashedPassword = hashUserPassword(password);
    newUser = await addUser(email, hashedPassword, username);

  }catch(error){

    throw new Error('Could not add a new user')

  }

  if (newUser) {
    // Create the session
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ user: email, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
  }
}

// NOTE: Logout function that destrois the cookie
export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function delUser() {
  let curruser: UserInterface;

  try {
    const session = await getSession();
    if (!session) throw new Error("Unauth Error");
    curruser = await getUser(session.user as string);
  } catch (error) {
    throw new Error("Unauth Error");
  }

  if (!curruser) {
    console.log("No User found");
    return;
  }

  const email = curruser.email;

  try {
    const result = await deleteUser(email);
    console.log(result);
  } catch (error) {
    console.log(error);
    throw new Error("Could not delete user")
  }
}
