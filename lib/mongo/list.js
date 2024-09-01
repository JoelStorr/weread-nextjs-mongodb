import clientPromis from ".";
import { getSession } from "../auth/tokenHandler";
import { getUser } from "./auth";
import { ObjectId } from "mongodb";

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

export async function getLists() {
  const session = await getSession();
  const user = await getUser(session.user);

  console.log("Users List", user.lists);

  return user.lists;
}

export async function getCurrentReadsDB() {
  const session = await getSession();
  const user = await getUser(session.user);

  console.log("Users List", user.lists);

  let currReads = user.lists.filter(list => { return list.name === "Current Reads";})
  console.log('Current Reads list', currReads);

  return currReads[0].books;
}


export async function addList(name, privateStatus) {
  const session = await getSession();
  const user = await getUser(session.user);

  // Loop over lists to see if listname is taken
  console.log(user);

  let list;
  for (list of user.lists) {
    console.log(list.name);

    if (list.name === name) {
      throw new Error("Name is already taken");
    }
  }

  // Add new List to array on user
  try {
    if (!users) await init();
    const response = await users.updateOne(
      { email: user.email },
      { $push: { lists: { name: name, private: privateStatus, books: [] } } }
    );

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Could not create a new List");
  }
}

export async function addBookToListDB(listName, bookId, pages) {
  const session = await getSession();
  const curruser = await getUser(session.user);

  try {
    if (!users) await init();
    const response = await users.updateOne(
      { email: curruser.email, "lists.name": listName },
      {
        $push: {
          "lists.$.books": {
            bookId: bookId,
            pages: pages,
            progress: 0,
            percent: false,
            bookType: "physical",
          },
        },
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Could not add book to list");
  }
}

//NOTE: Updateds the Progress of a Book in  a list
export async function updateProgressDB(listName, bookId, progress) {
  const session = await getSession();
  const curruser = await getUser(session.user);
  try {
    if (!users) await init();
    const response = await users.updateOne(
      { _id: new ObjectId(curruser._id) },
      {
        $set: {
          "lists.$[i].books.$[j].progress": progress,
        },
      },
      {
        arrayFilters: [
          { "i.name": listName },
          { "j.bookId": new ObjectId(bookId) },
        ],
      }
    );

    console.log("Updated Progress Response", response);
  } catch (error) {
    console.log(error);
    return { error: "Could not update progress" };
  }
}
