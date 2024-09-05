import clientPromis from ".";
import { getSession } from "../auth/tokenHandler";
import { getUser } from "./auth";
import { ObjectId } from "mongodb";

let client;
let db;
let statistics;

async function init(): Promise<void> {
  if (db) return;
  try {
    client = await clientPromis;
    db = await client.db();
    statistics = await db.collection("statistics");
  } catch (error) {
    throw new Error("Failed to Stabllish connection to database");
  }
}

(async () => {
  await init();
})();

// NOTE: Initiate New Statistics for new User
export async function initaiteStatisctics(userId: string): Promise<void> {
  try {
    if (!statistics) await init();

    const result = await statistics.insertOne({
      userId: userId,
      joinedDate: new Date(),
      totalPages: 0,
      yearList: [
        {
          year: new Date().getFullYear(),
          readingGoal: 10,
          readBooks: [],
          totalPages: 0,
        },
      ],
    });
  } catch (error) {
    console.log(error);
    throw new Error("Could not add Statistics for user");
  }
}

// NOTE: Add a Book to List when finished
export async function addBookToStatistic(
  bookId: string,
  bookPages: number
): Promise<void> {
  let user: UserInterface;

  try {
    const session = await getSession();
    if (!session) throw new Error("Unauth Error");
    user = await getUser(session.user as string);
  } catch (error) {
    throw new Error("Unauth Error");
  }

  console.log("Book data for statistics", bookId, bookPages);

  try {
    if (!statistics) await init();

    const response = await statistics.updateOne(
      {
        userId: new ObjectId(user._id),
        "yearList.year": new Date().getFullYear(),
      },
      {
        $inc: { totalPages: bookPages, "yearList.$.totalPages": bookPages },
        $push: {
          "yearList.$.readBooks": {
            bookId: new ObjectId(bookId),
            finishDate: new Date(),
          },
        },
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Could not add book to statistics");
  }
}

// NOTE: Get Statistics for user
export async function getStatisticDB(): Promise<StatisticsInterface> {
  let user: UserInterface;

  try {
    const session = await getSession();
    if (!session) throw new Error("Unauth Error");
    user = await getUser(session.user as string);
  } catch (error) {
    throw new Error("Unauth Error");
  }

  try {
    if (!statistics) await init();
    const response = await statistics.findOne({
      userId: new ObjectId(user._id),
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Could not get Statistics data");
  }
}
