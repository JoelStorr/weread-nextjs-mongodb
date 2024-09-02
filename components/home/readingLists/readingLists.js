import React from "react";
import classes from "./readingLists.module.scss";
import { getLists } from "@/lib/list";
import Link from "next/link";

export default async function ReadingLists() {
  const lists = await getLists();

  return (
    <>
      <section className={classes.readingLists}>
        <h3>Your Lists</h3>
        <ul>
          {lists && lists.map((list) => <li key={list.name}>
          <Link href={"/books/list/"+list.name}>
            {list.name}
          </Link>
          </li>)}
        </ul>
      </section>
    </>
  );
}
