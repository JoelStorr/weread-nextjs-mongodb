import React from 'react';
import classes from './readingGoals.module.scss';
import ProgressRing from '@/components/utils/progressRing/progressRing';
import { getStatisticData } from '@/lib/statistics';

export default async function ReadingGoals() {

    //const circle = useRef()

    const data = await getStatisticData();

    console.log('Statistic data', data);


  return (
    <>
      <section className={classes.readingGoals}>
        <div className={classes.yearGoal}>
          <p>2024</p>
          <img src="/icons/OpenBook100.png" />
          <p>
            Reading <br /> Goals
          </p>
        </div>
        <div className={classes.progressHolder}>
          <ProgressRing />
          <p>
            <span>25</span> of <span>50</span> books
          </p>
        </div>
      </section>
    </>
  );
}
