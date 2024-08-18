'use client'
import { useFormState } from "react-dom";
import { makeList, getLists, booksFromList, updateProgress } from '@/lib/list'
import React, { useEffect, useState } from 'react'
import Image from "next/image";


export default function Lists() {


    const [lists, setLists] = useState(null);
    const [activeList, setActiveList] = useState(null)
    const [activeListBooks, setActiveListBooks] = useState(null);

    const [state, formAction] = useFormState(makeList, {
      error: null,
      lists: [],
    });

    useEffect(()=>{
      let load = async ()=>{
        let listData = await getLists();
        console.log('Lists', listData)
        if(listData){
          setLists(listData);
        }
      }

      load();
    }, [])

    useEffect(() => {
      let load = async () => {
        let listData = await getLists();
        setLists(listData);
      };

      load();
    }, [state]);

    
    async function onActiveList(list){
      setActiveList(list);

      let booksIds = list.books.map(book => book.bookId);
      
      console.log(booksIds);
      const result = await booksFromList(booksIds);

      const convertedList = list.books.map((book) => {

        book.book = result.find(b => b._id === book.bookId)
        
        return book

      })

      console.log('Converted List',convertedList)
      setActiveListBooks(convertedList)
      //TODO: Fix bug loading books from lits
    }


  return (
    <>
      <h2>Make List</h2>
      <form action={formAction}>
        <label>
          List Title
          <input type="text" name="name" placeholder="Add a name" />
        </label>
        <br />
        <label>
          Private List
          <select name="private">
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
      <br />
      <h3>Lists</h3>
      <ul>
        {lists && lists.map((list) => (
          <li key={list.name} onClick={() => onActiveList(list)}>
            {list.name}
          </li>
        ))}
      </ul>
      <br />
      <ul>
        {activeListBooks &&
          activeListBooks.map((el) => (
            <li key={el.book._id}>
            <p>
            {el.book.title}
            </p>
            {el.book.cover && (
            <img src={el.book.cover} alt={"Book Cover"} fill/>
            )}
            {!el.book.cover && <p>No Cover</p>}

            <p>Current Progress: {el.progress} {el.percent && "%"}</p>
            <form action={updateProgress}>
              <label>
                Update Progress
                <input type="number" name="progress" defaultValue={el.progress}/>
              </label>

              <input type="hidden" value={el.book._id} name="bookId" />
              <input type="hidden" value={activeList.name} name="listName"/>
              <input type="hidden" value={el.book.pages} name="pages" />

              <button type="submit">Update</button>
            </form>
            <p>TotalPages: {el.pages}</p>

            </li>
          ))}
      </ul>
    </>
  );
}
