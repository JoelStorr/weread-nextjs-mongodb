import { Interface } from 'readline'
import { getListByName } from '@/lib/list'
import React from 'react'


interface Props {
  params: { listName: String}
}

const ListPage = async ({params} : Props): Promise<JSX.Element> => {

    let listName = params.listName;

    const list = await getListByName(listName);

    console.log(list);

    // TODO: Fix el any type
    return (
      <div>
        <ul>
          {list.map((el) => (
            <li key={el.bookId}>{el.book.title}</li>
          ))}
        </ul>
      </div>
    );

}


export default ListPage;
