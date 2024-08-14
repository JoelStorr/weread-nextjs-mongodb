import clientPromis from ".";

let client;
let db;
let books;

async function init() {
  if (db) return;
  try {
    client = await clientPromis;
    db = await client.db();
    books = await db.collection("books");
  } catch (error) {
    throw new Error("Failed to Stabllish connection to database");
  }
}

(async () => {
  await init();
})();

export async function getBooks() {
  try {
    if (!books) await init();
    const result = await books
      .find({})
      .limit(20)
      .map((user) => ({ ...user, _id: user._id.toString() }))
      .toArray();
    return { movies: result };
  } catch (error) {
    return { error: "Failed to fetch movies!" };
  }
}


export async function addBook(title, authorName, cover, isbn, pages ){
    try{
        if(!books) await init();
        const result = await books
        .insertOne({title: title, author: authorName, cover: cover, isbn: isbn, pages: pages })
        return result;
    }catch(error){
        return {error: "Could not add Book to db"}
    }
}