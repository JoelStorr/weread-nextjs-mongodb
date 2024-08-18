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
export async function initaiteStatisctics(userId){


    console.log('New user id', userId);

    try{
        if(!statistics) await init();

        const result = await statistics.insertOne({
            userId: userId,
            joinedDate: new Date(),
            yearList: [
                {
                    year: new Date(),
                    readingGoal: null,
                    readBooks: [],
                    totalPages: 0,
                }
            ]
        })
    }catch(error){
        console.log(error)
        return {error: 'Could not add Statistics for user'}
    }

}