import clientPromis from ".";
import { initaiteStatisctics } from "./statistic";

let client;
let db;
let users;

async function init() {
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
export async function getUser(email) {
  try {
    if (!users) await init();
    const result = await users.findOne({ email: email });

    result._id = result._id.toString();
    result.lists = result.lists.map((list) => {
      list.books = list.books.map((book) => ({
        ...book,
        bookId: book.bookId.toString(),
      }));
      return list;
    });

    console.log("User reslut", result);
    return { ...result };
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch a user!" };
  }
}

//NOTE: Get user via Username
export async function getUserName(name) {
  try {
    if (!users) await init();
    const result = await users.findOne({ username: name });
    result._id = result._id.toString();
    return result;
  } catch (error) {
    return { error: "Failed to fetch a user!" };
  }
}

// NOTE: Ceate New User
export async function addUser(email, passwordhashed, username) {
  try {
    if (!users) await init();
    const result = await users.insertOne({
      email: email,
      password: passwordhashed,
      username: username,
      lists: [],
    });

    const statistics = await initaiteStatisctics(result.insertedId);

    return { user: result };
  } catch (error) {
    return { errror: "Failed to add a user" };
  }
}

// NOTE: Delete a User
export async function deleteUser(email) {
  try {
    if (!users) await init();
    const result = await users.deleteOne({ email: email });
  } catch (error) {
    return { error: "Failed to delete user" };
  }
}
