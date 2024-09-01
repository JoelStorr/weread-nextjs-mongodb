'use client'
import React, {useEffect, useState} from 'react';
import classes from './readingGoals.module.scss';
import ProgressRing from '@/components/utils/progressRing/progressRing';

export default function ReadingGoals() {

    //const circle = useRef()
  

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
