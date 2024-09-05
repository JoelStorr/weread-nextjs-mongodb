import clientPromis from ".";
import { initaiteStatisctics } from "./statistic";

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
export async function getUser(
  email: string
): Promise<UserInterface> {
  try {
    if (!users) await init();
    const result: UserInterface = await users.findOne({ email: email });

    result._id = result._id.toString();
    result.lists = result.lists.map((list) => {
      list.books = list.books.map((book) => ({
        ...book,
        bookId: book.bookId.toString(),
      }));
      return list;
    });
    return { ...result };
  } catch (error) {
    console.log(error);
    throw new Error( "Failed to fetch a user!");
  }
}

//NOTE: Get user via Username
export async function getUserName(
  name: string
): Promise<UserInterface> {
  try {
    if (!users) await init();
    const result: UserInterface = await users.findOne({ username: name });
    result._id = result._id.toString();
    return result;
  } catch (error) {
    throw new Error("Failed to fetch a user!")
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

    await initaiteStatisctics(result.insertedId);
    return result;
  } catch (error) {
    throw new Error("Failed to add a user")
  }
}

// NOTE: Delete a User
export async function deleteUser(
  email: string
): Promise<void> {
  try {
    if (!users) await init();
    await users.deleteOne({ email: email });
    //TODO: Return info when user was deleted
  } catch (error) {
    throw new Error("Failed to delete user")
  }
}
