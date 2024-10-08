import clientPromis from ".";
import { getSession } from "../auth/tokenHandler";
import { checkUser, getUser } from "./auth";
import { ObjectId } from "mongodb";
import { addBookToStatistic } from "./statistic";
import { getUserByName } from "../user";

let client: any;
let db: any;
let users: any;
let profile: any;

async function init(): Promise<void> {
  if (db) return;
  try {
    client = await clientPromis;
    db = await client.db();
    users = await db.collection("users");
    profile = await db.collection("profile");
  } catch (error) {
    throw new Error("Failed to Stabllish connection to database");
  }
}

(async () => {
  await init();
})();

export async function initiateProfile(userId: string): Promise<void> {
  try {
    if (!profile) await init();

    const result = await profile.insertOne({
      userId: userId,
      layout: "[]",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Could not add Statistics for user");
  }
}

export async function saveLayoutDB(layout: string): Promise<void> {
  try {
    const user = await checkUser();

    const result = await profile.updateOne(
      { userId: new ObjectId(user._id) },
      { $set: { layout: layout } }
    );
  } catch (error) {
    console.log(error);

    return;
  }
}

export async function getLayoutDB(name: string): Promise<string> {
  if (name.length === 0) {
    try {
      const user = await checkUser();

      const result = await profile.findOne({ userId: new ObjectId(user._id) });

      if (result === null) throw new Error();

      return result.layout;
    } catch (error) {
      console.log(error);

      throw new Error("Could not load profile layout");
    }
  } else {
    try {
      const user = await getUserByName(name);
      if (user !== null) {
        const result = await profile.findOne({
          userId: new ObjectId(user._id),
        });

        if (result === null) throw new Error();

        return result.layout;
      }

      return "";
    } catch (error) {
      throw new Error("Could not load profile layout");
    }
  }
}
