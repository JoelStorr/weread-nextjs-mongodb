"use client"

import { useEffect, useState,  } from "react";
import {useFormState} from 'react-dom';
import { useRouter } from "next/navigation";
import { updateProgress } from "@/lib/list";
import ProgressBar from "@/components/utils/progressBar/progressBar";
import classes from "./currentBook.module.scss";

export default function CurrentBook({ keyVal, image, title, author, progress, listName, pages }) {
  
    const router = useRouter();

  const [selected, setSelected] = useState(null);
  const [state, formAction] =  useFormState(updateProgress, {message: null})

  useEffect(()=>{
    setSelected(null);
    router.refresh();
  }, [state])

  console.log(keyVal)

  return (
    <>
      <li className={classes.currentBookElement} key={keyVal}>
        <img src={image} />
        <div>
          <h4>{title}</h4>
          <p>
            by <span>{author}</span>
          </p>
          <ProgressBar progress={progress} />
          <button onClick={() => setSelected(keyVal)}>Udate</button>
        </div>
        {selected === keyVal && (
          <div className={classes.popUpHolder}>
            <form action={formAction}>
              <label>
                Update Progress
                <input
                  type="number"
                  name="progress"
                  defaultValue={progress}
                />
              </label>

            <p>Key {keyVal}</p>
              <input type="hidden" value={keyVal} name="bookId" />
              <input type="hidden" value={listName} name="listName" />
              <input type="hidden" value={pages} name="pages" />

              <button type="submit">Update</button>
            </form>
          </div>
        )}
      </li>
    </>
  );
}