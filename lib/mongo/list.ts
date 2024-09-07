import clientPromis from ".";
import { getSession } from "../auth/tokenHandler";
import { getUser } from "./auth";
import { ObjectId } from "mongodb";
import { addBookToStatistic } from "./statistic";
import { ListInterface, BookProgressInterface, UserInterface } from "@/types/types";

let client: any;
let db: any;
let users: any;

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

export async function getLists(): Promise<ListInterface[]> {
  try {
    const session = await getSession();
    if (!session) {
      return [];
    }
    const user = await getUser(session.user as string);
    return user.lists;
  } catch (error) {
    //TODO: Handle Error
    return [];
  }
}

export async function getCurrentReadsDB(): Promise<BookProgressInterface[]> {
  try {
    const session = await getSession();
    if (!session) return [];
    const user = await getUser(session.user as string);
    let currReads = user.lists.filter((list) => {
      return list.name === "Current Reads";
    });
    return currReads[0].books;
  } catch (error) {
    //TODO: Handle error
    return [];
  }
}

export async function getListByNameDB(
  name: string
): Promise<BookProgressInterface[]> {
  try {
    const session = await getSession();
    if (!session) return [];
    const user = await getUser(session.user as string);

    name = name.split("%20").join(" ");

    let currReads = user.lists.filter((list) => {
      return list.name === name;
    });

    return currReads[0].books;
  } catch (error) {
    return [];
  }
}

export async function addList(
  name: string,
  privateStatus: string
): Promise<ListInterface> {
  let user: UserInterface | null;

  try {
    const session = await getSession();
    if (!session) throw Error("Unauth Error");
    user = await getUser(session.user as string);
    if(user === null) throw Error();
  } catch (error) {
    throw new Error("Unauth Error");
  }

  // Loop over lists to see if listname is taken
  for (let list of user.lists) {
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

//TODO: Rethink the Return value
export async function addBookToListDB(
  listName: string,
  bookId: string,
  pages: number
): Promise<void> {
  let curruser: UserInterface|null;

  try {
    const session = await getSession();
    if (!session) throw new Error("Unauth Error");
    curruser = await getUser(session.user as string);
    if(curruser === null) throw new Error()
  } catch (error) {
    throw new Error("Unauth Error");
  }

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
export async function updateProgressDB(
  listName: string,
  bookId: string,
  progress: number
): Promise<void> {
  let curruser: UserInterface | null;

  try {
    const session = await getSession();
    if (!session) throw new Error("Unauth Error");
    curruser = await getUser(session.user as string);
    if (curruser === null) throw new Error();
  } catch (error) {
    throw new Error("Unauth Error");
  }

  // TODO: Handle Pages in Progress

  if (progress == 100) {
    try {
      if (!users) await init();

      const finishedBook = curruser.lists.map((list) => {
        return list.books.find((el) => el.bookId === bookId);
      })[0];

      if (!finishedBook) {
        throw new Error("Could not find the updated book in db");
      }
      // Sets the Book to Finsihed (Percent)
      finishedBook.progress = 100;

      //NOTE: Removes the finished Book
      const response2 = await users.updateOne(
        { _id: new ObjectId(curruser._id) },
        {
          $pull: {
            "lists.$[i].books": {
              bookId: new ObjectId(bookId),
            },
          },
        },
        {
          arrayFilters: [{ "i.name": listName }],
        }
      );

      // NOTE: Addes the Finished Book
      const response3 = await users.updateOne(
        { email: curruser.email, "lists.name": "Read" },
        {
          $push: {
            "lists.$.books": finishedBook,
          },
        }
      );

      // TODO: Add the Book to the Statistics data
      const statisticData = await addBookToStatistic(
        finishedBook.bookId,
        finishedBook.pages
      );

      console.log("Finished Book", finishedBook);
    } catch (error) {
      console.log(error);
      throw new Error("Could not update progress");
    }
  } else {
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
    } catch (error) {
      console.log(error);
      throw new Error("Could not update progress");
    }
  }
}
