import clientPromis from ".";
import { ObjectId } from "mongodb";

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

export async function addBook(title, authorName, cover, isbn, pages) {
  try {
    if (!books) await init();
    const result = await books.insertOne({
      title: title,
      author: authorName,
      cover: cover,
      isbn: isbn,
      pages: pages,
    });
    return result;
  } catch (error) {
    return { error: "Could not add Book to db" };
  }
}

export async function checkDuplicateBook(title, author, cover, isbn, pages) {
  try {
    if (!books) await init();
    const result = await books.findOne({
      title: title,
      author: author,
      cover: cover,
      isbn: isbn,
      pages: pages,
    });
    return { books: result };
  } catch (error) {
    return { error: "Failed to fetch movies!" };
  }
}


export async function getBooksInList(idList){
  
  idList = idList.map(id => new ObjectId(id))
  
  
  try{
    if(!books) await init();
    const result = books.find({_id: {$in: idList}})
    .map(book => ({...book, _id: book._id.toString()}))
    .toArray();
    return result;
  }catch(error){
    return {error: "Failed to load books in List"}
  }
}