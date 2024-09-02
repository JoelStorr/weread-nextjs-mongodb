import { getListByName } from '@/lib/list'
import React from 'react'

export default async function ListPage({params}) {
  
    let listName = params.listName

    const list = await getListByName(listName)

    console.log(list);

  
    return (
    <div>
    
    <ul>
        {list.map(el => (<li key={el.bookId}>{el.book.title}</li>))}
    </ul>
    
    </div>
  )
}
