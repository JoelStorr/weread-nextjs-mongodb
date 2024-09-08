import { UserInterface } from "@/types/types";
import clientPromis from ".";
import { initiateProfile } from "./profile";
import { initiateStatisctics } from "./statistic";

import { redirect } from "next/navigation";
import { getSession } from "../auth/tokenHandler";

let client;
let db;
let users;

async function init(): Promise<void> {
  if (db) return;
  try {
    client = await clientPromis;
    db = await client.db();
    users = await db.collection("users");
  } catch (error) {
    throw new Error("Failed to Stabllish connection to database");
  }
}

(async () => {
  await init();
})();

// NOTE: GET USER VIA EMAIL
export async function getUser(email: string): Promise<UserInterface | null> {
  try {
    if (!users) await init();
    const result: UserInterface | null = await users.findOne({ email: email });

    if (result == null) {
      return null;
    }

    result._id = result._id.toString();
    result.lists = result.lists.map((list) => {
      list.books = list.books.map((book) => ({
        ...book,
        bookId: book.bookId.toString(),
      }));
      return list;
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch a user!");
  }
}

//NOTE: Get user via Username
export async function getUserName(name: string): Promise<UserInterface | null> {
  try {
    if (!users) await init();
    const result: UserInterface | null = await users.findOne({
      username: name,
    });

    if (result === null) {
      return result;
    }

    result._id = result._id.toString();
    return result;
  } catch (error) {
    throw new Error("Failed to fetch a user!");
  }
}

// NOTE: Ceate New User

export async function addUser(
  email: string,
  passwordhashed: string,
  username: string
): Promise<UserInterface> {
  try {
    if (!users) await init();
    const result = await users.insertOne({
      email: email,
      password: passwordhashed,
      username: username,
      lists: [
        { name: "Current Reads", private: false, books: [] },
        { name: "Read", private: false, books: [] },
      ],
    });

    await initiateStatisctics(result.insertedId);
    await initiateProfile(result.insertedId);
    return result;
  } catch (error) {
    throw new Error("Failed to add a user");
  }
}

// NOTE: Delete a User
export async function deleteUser(email: string): Promise<void> {
  try {
    if (!users) await init();
    await users.deleteOne({ email: email });
    //TODO: Return info when user was deleted
  } catch (error) {
    throw new Error("Failed to delete user");
  }
}

export async function checkUser(): Promise<UserInterface> {
  let curruser: UserInterface | null;

  try {
    const session = await getSession();
    if (!session) throw new Error("Unauth Error");
    curruser = await getUser(session.user as string);
    if (curruser === null) throw new Error();
    return curruser;
  } catch (error) {
    redirect("/?login=true");
  }
}
