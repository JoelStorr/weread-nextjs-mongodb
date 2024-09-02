
import classes from "./currentReads.module.scss";

import { getCurrentReads } from "@/lib/list";
import CurrentBook from "./currentBook";


//NOTE: Show a list of current Reads List
export default async function CurrentReads() {
  const list = await getCurrentReads();

  return (
    <div className={classes.currentReadsList}>
      <h3>Current Reads</h3>
      <ul>
        {list &&
          list.map((el) => (
            <CurrentBook
            key={el.bookId}
              keyVal={el.bookId}
              image={el.book.cover}
              title={el.book.title}
              author={el.book.author}
              progress={el.progress}
              listName={"Current Reads"}
              pages={el.pages}
            />
          ))}
      </ul>
    </div>
  );
}
