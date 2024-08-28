"use client";

import { addBookToList, getLists } from "@/lib/list";
import React, { useEffect, useRef, useState } from "react";

import classes from "./navSearch.component.scss";

export default function NavSearch() {
  const search1 = useRef();
  //const search2 = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [lists, setLists] = useState([]);
  const [showList, setShowList] = useState(false);

  const [clickedList, setClickedList] = useState(null);
  const [clickedBook, setClickedBook] = useState({ id: null });

  function saveSelection() {
    console.log(clickedList);
    console.log(clickedBook);
  }

  function handleListClick(name) {
    setClickedList(name);
  }

  function handleBookClick(book) {
    console.log(book);

    setClickedBook(book);

    console.log(clickedBook);
  }

  async function loadLists() {
    const result = await getLists();
    setLists(result);
  }

  useEffect(() => {
    loadLists();
  }, []);

  async function runBookSearch(e, nav = false) {
    e.preventDefault();

    let search = "";

    if (nav) {
      search = search1.current.value;
      //search2.current.value = search;
      setSearchValue(search);
    } else {
      search = searchValue;
      search1.current.value = search;
    }

    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${pageIndex}&maxResults=10`
      );

      if (!res.ok) {
        throw new Error(`Response status ${res.status}`);
      }

      const response = await res.json();

      console.log(response);

      let temp = [];
      for (let i = 0; i < response.items.length; i++) {
        if (!response.items[i].volumeInfo.industryIdentifiers) {
          continue;
        }
        console.log(response.items[i].volumeInfo.industryIdentifiers.length);

        if (response.items[i].volumeInfo.industryIdentifiers.length === 0) {
          continue;
        }

        const bookObj = {
          id: response.items[i].id,
          title: response.items[i].volumeInfo.title,
          author: response.items[i].volumeInfo.authors,
          cover: null,
          isbn: null,
          pages: response.items[i].volumeInfo.pageCount,
        };

        if (response.items[i].volumeInfo.imageLinks) {
          bookObj["cover"] = response.items[i].volumeInfo.imageLinks.thumbnail;
        }

        console.log(response.items[i].volumeInfo.industryIdentifiers);

        if (response.items[i].volumeInfo.industryIdentifiers.length > 1) {
          if (response.items[i].volumeInfo.industryIdentifiers[1].identifier) {
            bookObj["isbn"] =
              response.items[i].volumeInfo.industryIdentifiers[1].identifier;
          }
        } else {
          if (response.items[i].volumeInfo.industryIdentifiers[0].identifier) {
            bookObj["isbn"] =
              response.items[i].volumeInfo.industryIdentifiers[0].identifier;
          }
        }
        temp.push(bookObj);
      }

      setSearchResult([...temp]);

      console.log(searchResult);
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <form className="search" onSubmit={(e) => runBookSearch(e, true)}>
        <input
          type="text"
          name="search"
          ref={search1}
          placeholder="Search for Books"
        />
      </form>
      {searchResult.length > 0 && (
        <div>
          <div
            className="search-popup-bg"
            onClick={() => setSearchResult([])}
          ></div>
          <div className="search-popup">
            <form className="search" onSubmit={runBookSearch}>
              <input
                type="text"
                name="search"
                value={searchValue}
                onChange={handleInputChange}
                placeholder="Search for Books"
              />
            </form>

            <div className="book-list-holder">
              <ul>
                {searchResult.map((book, index) => (
                  <li key={book.id} className="book-list-element">
                    <div className="book-list-detail">
                      <img src={book.cover} />
                      <div>
                        <h4>{book.title}</h4>
                        <br />
                        <p>
                          by <span>{book.author}</span>{" "}
                        </p>
                        <br />
                        <p>pages: {book.pages}</p>
                      </div>
                      <div className="add-to-list-btn">
                        {/* TODO: Load List and Display users list */}
                        <button onClick={() => handleBookClick(book)}>
                          Add to List
                        </button>
                        {clickedBook.id == book.id && (
                          <div className="list-holder">
                            <ul>
                              {lists.map((list) => (
                                <li
                                  key={list.name}
                                  onClick={() => {
                                    addBookToList(list.name, clickedBook);
                                    handleBookClick({ id: null });
                                  }}
                                >
                                  {list.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    {searchResult.length - 1 !== index && <hr />}
                  </li>
                ))}
              </ul>
            </div>
            <div className="btn-holder">
              <div>
                <button
                  className="search-btn"
                  onClick={(e) => {
                    setPageIndex(pageIndex - 10);
                    runBookSearch(e);
                  }}
                >
                  Prev 10
                </button>
                <button
                  className="search-btn"
                  onClick={(e) => {
                    setPageIndex(pageIndex + 10);
                    runBookSearch(e);
                  }}
                >
                  Next 10
                </button>
              </div>

              <button
                className="search-btn"
                onClick={(e) => {
                  runBookSearch(e);
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  //   return (
  //     <>
  //       <div>BookSearch</div>
  //       <form onSubmit={runBookSearch}>
  //         <label>
  //           Search for a Book
  //           <input type="text" ref={search} />
  //           <button type="submit">Search</button>
  //           <br />
  //           <button
  //             onClick={() => {
  //               setPageIndex(pageIndex + 10);
  //             }}
  //           >
  //             Next 10
  //           </button>
  //           <button
  //             onClick={() => {
  //               setPageIndex(pageIndex - 10);
  //             }}
  //           >
  //             Prev 10
  //           </button>
  //         </label>
  //       </form>
  //       <ul>
  //         {searchResult.map((book) => (
  //           <li key={book.id} onClick={() => handleBookClick(book)}>
  //             <p>
  //               {book.title} - {book.author}
  //             </p>
  //             <img src={book.cover} />
  //           </li>
  //         ))}
  //       </ul>

  //       <br />

  //       {searchResult.length > 0 && (
  //         <>
  //           <button onClick={loadLists}>Load List</button>
  //           <ul>
  //             {lists.map((list) => (
  //               <li key={list.name} onClick={() => handleListClick(list.name)}>
  //                 {list.name}
  //               </li>
  //             ))}
  //           </ul>
  //         </>
  //       )}

  //       {clickedBook && clickedList && (
  //         <button onClick={() => addBookToList(clickedList, clickedBook)}>
  //           Save
  //         </button>
  //       )}
  //     </>
  //   );
}
