"use server";

import { hashUserPassword } from "./hash";

import { redirect } from "next/dist/server/api-utils";
import { addUser } from "../mongo/auth";

export async function signup(prevState, formData) {
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
