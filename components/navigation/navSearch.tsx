"use client";

import { addBookToList, getLists } from "@/lib/list";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import classes from "./navSearch.module.scss";
import { ListInterface, SearchBook, UserInterface, UserInterfaceSearch } from "@/types/types";
import { getUserByName } from "@/lib/user";
import Link from "next/link";


  interface BookObject {
    id: string;
    title: string;
    author: string;
    cover: string | undefined ;
    isbn: string | undefined;
    pages: number;
  }

const NavSearch: React.FC = () => {

  const router = useRouter();

  const search1 = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<SearchBook[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [lists, setLists] = useState<ListInterface[]>([]);
  const [clickedBook, setClickedBook] = useState<SearchBook | {id: null}>({ id: null });
  const [user, setUser] = useState<UserInterfaceSearch | null>(null)

  function handleBookClick(book:SearchBook | {id: null}) {
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
  async function runBookSearch(
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    nav = false
  ) {
    e.preventDefault();

    let search = "";

    if (nav) {
      if (search1.current) {
        search = search1.current.value;
        setSearchValue(search);
      }
    } else {
      search = searchValue;
      if (search1.current) {
        search1.current.value = search;
      }
    }

    if(search.split("")[0] === "@"){


      const user = await getUserByName(search);
      setUser(user);
      return;
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

      let temp: SearchBook[] = [];
      for (let i = 0; i < response.items.length; i++) {
        if (!response.items[i].volumeInfo.industryIdentifiers) {
          continue;
        }

        if (response.items[i].volumeInfo.industryIdentifiers.length === 0) {
          continue;
        }

        const bookObj: SearchBook = {
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

  //TODO: Split Book Results and user results into there own Components
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
      {(searchResult.length > 0 || user !== null)  && (
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
             
              {/* NOTE: Search Result Books */}
                {searchResult.length > 0 &&
                <ul>
                {searchResult.map((book, index) => (
                  <li key={book.id} className={classes.bookListElement}>
                    <div className={classes.bookListDetail}>
                      <img src={book.cover || ""} />
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
                    {searchResult.length - 1 !== index && <hr className={classes.hr}/>}
                  </li>
                ))}
                </ul>
              }
              {/* NOTE: User Search Results */}
              {user && (
                <ul>
                  <li>
                    <Link href={"/profile/"+user.username} onClick={()=>setUser(null)}>{user.username}</Link>
                  </li>
                </ul>
              )}

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


export default NavSearch;