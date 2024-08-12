
import clientPromis from ".";

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
    const result = await users
      .findOne({email: email})

      result._id = result._id.toString();
    return { ...result };
  } catch (error) {
    console.log(error)
    return { error: "Failed to fetch a user!" };
  }
}

//NOTE: Get user via Username
export async function getUserName(name) {
  try {
    if (!users) await init();
    const result = await users
      .findOne({ username: name })
       result._id = result._id.toString();
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
        return {user: result}
    } catch(error){
        return {errror: 'Failed to add a user'}
    }
}






