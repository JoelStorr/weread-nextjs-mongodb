import clientPromis from ".";
import { getSession } from "../auth/tokenHandler";
import { getUser } from "./auth";
import { ObjectId } from "mongodb";

let client;
let db;
let statistics;

async function init() {
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
export async function initaiteStatisctics(userId) {
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
    return { error: "Could not add Statistics for user" };
  }
}

// TODO: Add a Book to List when finished
export async function addBookToStatistic(bookId, bookPages) {
  const session = await getSession();
  const user = await getUser(session.user);

  console.log('Book data for statistics',bookId, bookPages)

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

    return response;
  } catch (error) {
    console.log(error);
  }
}

// TODO: Get Statistics for user
export async function getStatisticDB() {
  const session = await getSession();
  const user = await getUser(session.user);

  try {
    if (!statistics) await init();
    const response = await statistics.findOne({ userId: new ObjectId(user._id) });
    return response;
  } catch (error) {
    console.log(error);
  }
}