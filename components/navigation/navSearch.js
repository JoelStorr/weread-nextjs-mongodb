"use client";

import { addBookToList, getLists } from "/lib/list";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import classes from "./navSearch.module.scss";

export default function NavSearch() {

  const router = useRouter();

  const search1 = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [lists, setLists] = useState([]);
  const [clickedBook, setClickedBook] = useState({ id: null });

  function handleBookClick(book) {
    setClickedBook(book);
  }

  async function loadLists() {
    const result = await getLists();
    setLists(result);
  }

  useEffect(() => {
    loadLists();
  }, []);

  //NOTE: Search Books via Google Books API
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

      
      //NOTE: Convert Books to usable format

      let temp = [];
      for (let i = 0; i < response.items.length; i++) {
        if (!response.items[i].volumeInfo.industryIdentifiers) {
          continue;
        }
        

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

    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <form className={classes.search} onSubmit={(e) => runBookSearch(e, true)}>
        <input
          type="text"
          name="search"
          ref={search1}
          placeholder="Search for Books"
        />
      </form>
      {/* NOTE: Search Popup */}
      {searchResult.length > 0 && (
        <div>
          <div
            className={classes.searchPopupBg}
            onClick={() => setSearchResult([])}
          ></div>
          <div className={classes.searchPopup}>
            <form className={classes.search} onSubmit={runBookSearch}>
              <input
                type="text"
                name="search"
                value={searchValue}
                onChange={handleInputChange}
                placeholder="Search for Books"
              />
            </form>

            <div  className={classes.bookListHolder}>
              <ul>
              {/* NOTE: Search Result */}
                {searchResult.map((book, index) => (
                  <li key={book.id} className={classes.bookListElement}>
                    <div className={classes.bookListDetail}>
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
                      <div className={classes.addToListBtn}>
                        <button onClick={() => handleBookClick(book)}>
                          Add to List
                        </button>
                        {clickedBook.id == book.id && (
                          <div className={classes.listHolder}>
                            <ul>
                              {lists.map((list) => (
                                <li
                                  key={list.name}
                                  onClick={() => {
                                    addBookToList(list.name, clickedBook);
                                    handleBookClick({ id: null });
                                    setSearchResult([]);
                                    router.refresh();
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
            <div className={classes.btnHolder}>
              <div>
                <button
                  className={classes.searchBtn}
                  onClick={(e) => {
                    setPageIndex(pageIndex - 10);
                    runBookSearch(e);
                  }}
                >
                  Prev 10
                </button>
                <button
                  className={classes.searchBtn}
                  onClick={(e) => {
                    setPageIndex(pageIndex + 10);
                    runBookSearch(e);
                  }}
                >
                  Next 10
                </button>
              </div>

              <button
                className={classes.searchBtn}
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
}
