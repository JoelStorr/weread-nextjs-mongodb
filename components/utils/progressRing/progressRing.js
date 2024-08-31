'use client'
import React, {useEffect, useState} from 'react'
import classes from './progressRing.module.scss';

export default function ProgressRing() {

      const radius = 30;
      var circumference = radius * 2 * Math.PI;
      const [circleOffset, setCircleOffset] = useState(`${circumference}`);

      let strokeDasharray = `${circumference} ${circumference}`;

      function setProgress(percent = 50) {
        const offset = circumference - (percent / 100) * circumference;
        setCircleOffset(offset);
      }

      useEffect(() => {
        setProgress();
      }, []);

  return (
    <div className={classes.progress}>
      <svg class={classes.progressRing} width="70" height="70">
        <circle
          class={classes.progressRingCircle}
          stroke="#2B7CE6"
          strokeOpacity="50%"
          stroke-width="8"
          fill="transparent"
          r={radius}
          cx="35"
          cy="35"
        />
        <circle
          class={classes.progressRingCircle}
          stroke="#1E2362"
          stroke-width="8"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={circleOffset}
          fill="transparent"
          r={radius}
          cx="35"
          cy="35"
        />
      </svg>
      <span>50%</span>
    </div>
  );
}
