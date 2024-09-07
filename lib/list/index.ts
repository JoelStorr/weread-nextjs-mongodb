"use server";

import { BookInterface, BookProgressInterface, ListInterface, SearchBook } from "@/types/types";
import { getSession } from "../auth/tokenHandler";
import { getUser } from "../mongo/auth";
import { addBook, checkDuplicateBook, getBooksInList } from "../mongo/book";
import {
  addBookToListDB,
  addList,
  getCurrentReadsDB,
  getListByNameDB,
  getLists as getListsDB,
  updateProgressDB,
} from "../mongo/list";


export async function makeList(prevData, formData: FormData): Promise<ListInterface> {
  const name = formData.get("name");
  const privateList = formData.get("private");

  if(!name || !privateList) {
    // TODO: Handle wrong submitted data
  }

  const result = await addList(name as string, privateList as string);

  return result;
}

export async function getLists():Promise<ListInterface[]> {
  return await getListsDB();
}


export async function getListByName(name:string): Promise<BookProgressInterface[]> {
  
  try{
    const list = await getListByNameDB(name);
  
    let idList = list.map(el => el.bookId);
  
    const books = await getBooksInList(idList);
  
    const convertedList = list.map(el => {
      el.book = books.find(b => b._id === el.bookId)
      return el;
    })
  
    return convertedList;

  } catch(error){
    throw new Error("Could not get the List");
  }
}

export async function getCurrentReads(): Promise<BookProgressInterface[]> {
  try{
    const books = await getCurrentReadsDB();
    const listId = books.map((book) => book.bookId);
    const booksFromList = await getBooksInList(listId);
    const convertedList = books.map((book) => {
      book.book = booksFromList.find((b) => b._id === book.bookId);
      return book;
    });
    return convertedList;

  }catch(error){
    throw new Error('Could not load current reads');
  }
}

export async function addBookToList(listName: string, book:SearchBook):Promise<void> {
  const checkBook = await checkDuplicateBook(
    book.title,
    book.author[0],
    book.cover|| "",
    book.isbn || "",
    book.pages
  );

  let result;
  let listResult;
  if (checkBook) {
    listResult = await addBookToListDB(
      listName,
      checkBook._id,
      book.pages
    );
  } else {
    // NOTE: Add Book to db
    result = await addBook(
      book.title,
      book.author[0],
      book.cover || "",
      book.isbn || "",
      book.pages
    );

    //TODO: Book Object with Book id and progress information

    //TODO: Add Book ID to list array

    listResult = await addBookToListDB(listName, result.insertedId, book.pages);
  }
}

// NOTES: Get books from List
export async function booksFromList(IdList:string[]):Promise<BookInterface[]> {
  try {
    const result = await getBooksInList(IdList);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Could not load books from list');
  }
}

export async function updateProgress(prevState, formData: FormData):Promise<{message: string}> {
  let progress = formData.get("progress");
  let bookId = formData.get("bookId");
  let listName = formData.get("listName");
  let pages = formData.get("pages");

  prevState.message = "Progress missing";
  if(!progress) return prevState

  let progressNumber:number = +progress;

  // NOTE: Handle Book Completion
  // Add Book to array
  // Increment total pages

  const result = await updateProgressDB(listName as string, bookId as string, progressNumber);
  prevState.message = "Updated";
  return prevState;
}
