"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { updateProgress } from "@/lib/list";
import ProgressBar from "@/components/utils/progressBar/progressBar";
import classes from "./currentBook.module.scss";

export default function CurrentBook({
  keyVal,
  image,
  title,
  author,
  progress,
  listName,
  pages,
}) {
  const router = useRouter();

  const [selected, setSelected] = useState(null);
  const [state, formAction] = useFormState(updateProgress, { message: null });

  useEffect(() => {
    setSelected(null);
    router.refresh();
  }, [state]);

  //console.log(keyVal)

  function handleKlick(e, keyVal) {
    e.stopPropagation();

    setSelected(keyVal);
  }

  return (
    <>
      <li
        className={classes.currentBookElement}
        key={keyVal}
        onClick={() => setSelected(null)}
      >
        <img src={image} />
        <div>
          <h4>{title}</h4>
          <p>
            by <span>{author}</span>
          </p>
          <ProgressBar progress={progress} />
          <button onClick={(e) => handleKlick(e, keyVal)}>Udate</button>
        </div>
        {selected === keyVal && (
          <div
            className={classes.popUpHolder}
            onClick={(e) => e.stopPropagation()}
          >
            <form action={formAction}>
              <label>
                Update Progress: <br />
                <input type="number" name="progress" defaultValue={progress} />
              </label>
              <input type="hidden" value={keyVal} name="bookId" />
              <input type="hidden" value={listName} name="listName" />
              <input type="hidden" value={pages} name="pages" />
              <br />
              <div>
                <button type="submit" className={classes.updateBtn}>
                  Update
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className={classes.closeBtn}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        )}
      </li>
    </>
  );
}
