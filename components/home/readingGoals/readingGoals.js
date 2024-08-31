'use client'
import React, {useEffect, useState} from 'react';
import classes from './readingGoals.module.scss';

export default function ReadingGoals() {

    //const circle = useRef()
    const radius = 30
    var circumference = radius * 2 * Math.PI;
    const [circleOffset, setCircleOffset] = useState(`${circumference}`);
    

    let strokeDasharray = `${circumference} ${circumference}`;
    

    function setProgress(percent = 50) {
      const offset = circumference - (percent / 100) * circumference;
      //circle.style.strokeDashoffset = offset;
      setCircleOffset(offset)
    }


   useEffect(()=>{
    setProgress();
   }, [])

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
        <div>
          <div className={classes.progress}>
            <svg class={classes.progressRing} width="120" height="120">
              <circle
                class={classes.progressRingCircle}
                stroke="#2B7CE6"
                strokeOpacity="50%"
                stroke-width="8"
                fill="transparent"
                r={radius}
                cx="60"
                cy="60"
              />
              <circle
                class={classes.progressRingCircle}
                stroke="#1E2362"
                stroke-width="8"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={circleOffset}
                fill="transparent"
                r={radius}
                cx="60"
                cy="60"
              />
            </svg>
            <span className={classes.percent}>50%</span>
          </div>
          <p>
            <span>25</span> of <span>50</span> books
          </p>
          <button>Update</button>
        </div>
      </section>
    </>
  );
}
