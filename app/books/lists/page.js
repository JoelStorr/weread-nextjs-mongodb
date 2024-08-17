'use client'
import { useFormState } from "react-dom";
import { makeList, getLists } from '@/lib/list'
import React, { useEffect, useState } from 'react'


export default function Lists() {


    const [lists, setLists] = useState([]);
    const [activeList, setActiveList] = useState(null)

    const [state, formAction] = useFormState(makeList, {
      error: null,
      lists: [],
    });

    useEffect(()=>{
      let load = async ()=>{
        let listData = await getLists();
        setLists(listData);
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
        {lists.map((list) => (
          <li key={list.name} onClick={()=>setActiveList(list)}>{list.name}</li>
        ))}
      </ul>
      <br/>
      <ul>
        {
          activeList && activeList.books.map(book => (
            <li key={book.bookId}>{book.bookId}</li>
          ))
        }
      </ul>
    </>
  );
}
