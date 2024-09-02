import React from "react";
import classes from "./readingGoals.module.scss";
import ProgressRing from "@/components/utils/progressRing/progressRing";
import { getStatisticDataCurrYear } from "@/lib/statistics";

export default async function ReadingGoals() {
  //const circle = useRef()

  const data = await getStatisticDataCurrYear();

  let percent;
  let year = new Date(data.year).getFullYear();

  if (data.readBooks.length == 0) {
    percent = 0;
  } else {
    percent = (data.readBooks.length / data.readingGoal) * 100;
  }

  return (
    <>
      <section className={classes.readingGoals}>
        <div className={classes.yearGoal}>
          <p>{year}</p>
          <img src="/icons/OpenBook100.png" />
          <p>
            Reading <br /> Goals
          </p>
        </div>
        <div className={classes.progressHolder}>
          <ProgressRing percent={percent} />
          <p>
            <span>{data.readBooks.length}</span> of{" "}
            <span>{data.readingGoal}</span> books
          </p>
        </div>
      </section>
    </>
  );
}
