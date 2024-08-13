import clientPromis from ".";
import { getSession } from "../auth/tokenHandler";
import { getUser } from "./auth";

let client;
let db;
let lists;

async function init() {
  if (db) return;
  try {
    client = await clientPromis;
    db = await client.db();
    lists = await db.collection("lists");
  } catch (error) {
    throw new Error("Failed to Stabllish connection to database");
  }
}

(async () => {
  await init();
})();

export async function getLists() {


    const session = await getSession();
    const user = await getUser(session.user.email);

  try {
    if (!lists) await init();
    const result = await lists
      .find({user: user._id})
      .map((list) => ({ ...list, _id: list._id.toString() }))
      .toArray();
    return { lists: result };
  } catch (error) {
    return { error: "Failed to fetch movies!" };
  }
}
