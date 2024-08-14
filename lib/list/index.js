'use server';

import { getSession } from "../auth/tokenHandler";
import { getUser } from "../mongo/auth";
import { addBook } from "../mongo/book";
import { addBookToListDB, addList, getLists as getListsDB } from "../mongo/list";



export async function makeList(prevData, formData) {
    const name = formData.get("name");
    const privateList = formData.get("private")
    const result = await addList(name, privateList);
    
    return {result}
}


export async function getLists(){
    return await getListsDB()
}


export async function addBookToList(
    listName,
    book
   
){
    // TODO: Add Book to db
    const result = await addBook(book.title, book.authorName, book.cover, book.isbn, book.pages);

    console.log(result);

    //TODO: Book Object with Book id and progress information
    const listResult = await addBookToListDB(listName, result.insertedId);



    //TODO: Add Book ID to list array
    
}