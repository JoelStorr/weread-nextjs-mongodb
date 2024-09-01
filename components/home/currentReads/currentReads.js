import React from "react";
import classes from "./currentReads.module.scss";
import ProgressBar from "@/components/utils/progressBar/progressBar";
import { getCurrentReads } from "@/lib/list";

export default async function CurrentReads() {
  const list = await getCurrentReads();

  return (
    <div className={classes.currentReadsList}>
      <h3>Current Reads</h3>
      <ul>
        {list &&
          list.map((el) => (
            <CurrentBook
              key={el._id}
              image={el.book.cover}
              title={el.book.title}
              author={el.book.author}
              progress={el.progress}
            />
          ))}
      </ul>
    </div>
  );
}

function CurrentBook({ key, image, title, author, progress }) {
  return (
    <li className={classes.currentBookElement} key={key}>
      <img src={image} />
      <div>
        <h4>{title}</h4>
        <p>
          by <span>{author}</span>
        </p>
        <ProgressBar progress={progress} />
        <button>Udate</button>
      </div>
    </li>
  );
}