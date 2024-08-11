
import clientPromis from ".";

let client;
let db;
let users;

async function init() {
  if (db) return;
  try {
    client = await clientPromis;
    db = await client.db();
    movies = await db.collection("users");
  } catch (error) {
    throw new Error("Failed to Stabllish connection to database");
  }
}

(async () => {
  await init();
})();

export async function getUser() {
  try {
    if (!users) await init();
    const result = await users
      .findOne({email})
      .map((user) => ({ ...user, _id: user._id.toString() }))
    return { user: result };
  } catch (error) {
    return { error: "Failed to fetch a user!" };
  }
}




// TODO: Ceate New User 
export async function addUser(email, passwordhashed, username){
    try{
        if (!users) await init();
        const result = await users
        .insertOne({
            email: email,
            password: passwordhashed,
            username: username
        })
    } catch(error){
        return {errror: 'Failed to add a user'}
    }
}






// TODO: GET USER VIA EMAIL