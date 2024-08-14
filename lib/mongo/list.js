import clientPromis from ".";
import { getSession } from "../auth/tokenHandler";
import { getUser } from "./auth";

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



// export async function getLists() {


//     const session = await getSession();
//     const user = await getUser(session.user);

//     // TODO: Handle Lists on the User directyl


//   try {
//     if (!lists) await init();
//     const result = await lists
//       .find({user: user._id})
//       .map((list) => ({ ...list, _id: list._id.toString() }))
//       .toArray();
//     return { lists: result };
//   } catch (error) {
//     return { error: "Failed to fetch movies!" };
//   }
// }


export async function addList(name, privateStatus){
  const session = await getSession();
  const user = await getUser(session.user);

  // Loop over lists to see if listname is taken
  console.log(user)

  for(list of user.lists){
    console.log(list.name)
    
    if(list.name === name){
      throw new Error('Name is already taken');
    }
  }


  // Add new List to array on user
  try{
    if(!users) await init();
    const response = await users
    .updateOne(
      {email: user.email},
      {$push: {lists: {name: name, private: privateStatus, books: []}}}
    )

    return response
  }catch(error){
    console.log(error)
    throw new Error('Could not create a new List')
  }

  



}