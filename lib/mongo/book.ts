import { BookInterface } from "@/types/types";
import clientPromis from ".";
import { ObjectId } from "mongodb";

let client;
let db;
let books;

async function init(): Promise<void> {
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

//TODO: Handle book limites
export async function getBooks(): Promise<
  { books: BookInterface[] }
> {
  try {
    if (!books) await init();
    const result = await books
      .find({})
      .limit(20)
      .map((book: BookInterface) => ({ ...book, _id: book._id.toString() }))
      .toArray();
    return { books: result };
  } catch (error) {
    throw new Error('Failed to fetch Books')
  }
}

export async function addBook(
  title: string,
  authorName: string,
  cover: string,
  isbn: string,
  pages: number
): Promise<BookInterface> {
  try {
    if (!books) await init();
    const result: BookInterface = await books.insertOne({
      title: title,
      author: authorName,
      cover: cover,
      isbn: isbn,
      pages: pages,
    });
    return result;
  } catch (error) {
    throw new Error("Could not add Book to db");
  }
}

export async function checkDuplicateBook(
  title: string,
  author: string,
  cover: string,
  isbn: string,
  pages: number
): Promise<BookInterface> {
  try {
    if (!books) await init();
    const result: Awaited<BookInterface> = await books.findOne({
      title: title,
      author: author,
      cover: cover,
      isbn: isbn,
      pages: pages,
    });
    return result;
  } catch (error) {
    throw new Error('Failed to check duplicate Books')
  }
}

export async function getBooksInList(
  idList: string[]
): Promise<BookInterface[]> {
  let objIdList = idList.map((id) => new ObjectId(id));

  try {
    if (!books) await init();
    const result = books
      .find({ _id: { $in: objIdList } })
      .map((book: BookInterface) => ({ ...book, _id: book._id.toString() }))
      .toArray();
    return result;
  } catch (error) {
    throw new Error("Failed to load books in List");
  }
}
