import { makeList } from '@/lib/list'
import { getLists } from '@/lib/mongo/list'
import React from 'react'

export default async function Lists() {


    const {lists} = await getLists()

    console.log(lists)


  return (
    <>
    <div>Lists</div>
    <ul>
        {lists.map(list => (<li key={list._id}>{list.name}</li>))}
    </ul>
    <br/>
    <h2>Make List</h2>
    <form action={makeList}>
        <label>
            List Title
            <input type="text" name="name" placeholder='Add a name'/>
        </label>
        <button type='submit'>Add</button>
    </form>

    </>
  )
}
