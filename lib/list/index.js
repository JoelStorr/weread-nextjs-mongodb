"use server";

import { getSession } from "../auth/tokenHandler";
import { getUser } from "../mongo/auth";
import { addBook, checkDuplicateBook, getBooksInList } from "../mongo/book";
import {
  addBookToListDB,
  addList,
  getLists as getListsDB,
  updateProgressDB,
} from "../mongo/list";

export async function makeList(prevData, formData) {
  const name = formData.get("name");
  const privateList = formData.get("private");
  const result = await addList(name, privateList);

  return { result };
}

export async function getLists() {
  return await getListsDB();
}

export async function addBookToList(listName, book) {
  const checkBook = await checkDuplicateBook(
    book.title,
    book.author,
    book.cover,
    book.isbn,
    book.pages
  );

  console.log('Book', book);

  let result;
  let listResult;
  if (checkBook.books) {
    listResult = await addBookToListDB(
      listName,
      checkBook.books._id,
      book.pages
    );
  } else {
    // TODO: Add Book to db
    result = await addBook(
      book.title,
      book.author,
      book.cover,
      book.isbn,
      book.pages
    );
    console.log('Added Book', result);

    //TODO: Book Object with Book id and progress information

    //TODO: Add Book ID to list array

    listResult = await addBookToListDB(listName, result.insertedId, book.pages);
  }
}


// NOTES: Get books from List
export async function booksFromList(IdList) {
  
  try{
    const result = await getBooksInList(IdList)
    console.log('Books from lits', result);
    return result;

  }catch(error){
    console.log(error)
  }
  
}


export async function updateProgress(formData){

  let progress = formData.get('progress');
  let bookId = formData.get('bookId');
  let listName = formData.get('listName');
  let pages = formData.get('pages');

  progress = + progress;
  

  console.log('Progress', progress);
  console.log('Book ID', bookId);
  console.log("List Name", listName);


  // NOTE: Handle Book Completion
  // Add Book to array
  // Increment total pages


  const result = await updateProgressDB(listName, bookId, progress);


}