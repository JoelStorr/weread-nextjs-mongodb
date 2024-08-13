'use client'

import React, { useRef,useState } from 'react'

export default function BookSearch() {


    const  search = useRef();
    const [searchResult, setSearchResult] =  useState([]);
    const [pageIndex, setPageIndex] = useState(0)

    
    
    async function runBookSearch(e){

        e.preventDefault();
        
        try{
            const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search.current.value}&startIndex=${pageIndex}&maxResults=10`)

            if(!res.ok){
                throw new Error(`Response status ${res.status}`)
            }

            const response = await res.json()

            console.log(response);

            let temp = [];
            for (let i = 0; i < response.items.length; i++) {
              if (!response.items[i].volumeInfo.industryIdentifiers) {
                continue;
              }
              console.log(
                response.items[i].volumeInfo.industryIdentifiers.length
              );

              if (
                response.items[i].volumeInfo.industryIdentifiers.length ===
                0
              ) {
                continue;
              }

              const bookObj = {
                id: response.items[i].id,
                title: response.items[i].volumeInfo.title,
                author: response.items[i].volumeInfo.authors,
                img: null,
                isbn: null,
                pages: response.items[i].volumeInfo.pageCount,
              };

              if (response.items[i].volumeInfo.imageLinks) {
                bookObj["img"] =
                  response.items[i].volumeInfo.imageLinks.thumbnail;
              }

              console.log(
                response.items[i].volumeInfo.industryIdentifiers
              );

              if (
                response.items[i].volumeInfo.industryIdentifiers.length > 1
              ) {
                if (
                  response.items[i].volumeInfo.industryIdentifiers[1]
                    .identifier
                ) {
                  bookObj["isbn"] =
                    response.items[
                      i
                    ].volumeInfo.industryIdentifiers[1].identifier;
                }
              } else {
                if (
                  response.items[i].volumeInfo.industryIdentifiers[0]
                    .identifier
                ) {
                  bookObj["isbn"] =
                    response.items[
                      i
                    ].volumeInfo.industryIdentifiers[0].identifier;
                }
              }
              temp.push(bookObj);
            }

            setSearchResult([...temp]);

            console.log(searchResult)

        } catch(error){
            console.log(error)
        }
    }


    


  return (
    <>
      <div>BookSearch</div>
      <form onSubmit={runBookSearch}>
        <label>
          Search for a Book
          <input type="text" ref={search} />
          <button type="submit">Search</button>
          <br />
          <button
            onClick={() => {
              setPageIndex(pageIndex + 10);
            }}
          >
            Next 10
          </button>
          <button
            onClick={() => {
              setPageIndex(pageIndex - 10);
            }}
          >
            Prev 10
          </button>
        </label>
      </form>
      <ul>
        {searchResult.map((book) => (
          <li key={book.id}> {book.title}</li>
        ))}
      </ul>
    </>
  );
}
