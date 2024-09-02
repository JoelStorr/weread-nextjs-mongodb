"use client";
import React, { useEffect, useState } from "react";
import classes from "./progressRing.module.scss";

export default function ProgressRing({ percent }) {
  const radius = 30;
  var circumference = radius * 2 * Math.PI;
  const [circleOffset, setCircleOffset] = useState(`${circumference}`);

  let strokeDasharray = `${circumference} ${circumference}`;

  function setProgress(percent = 1) {
    const offset = circumference - (percent / 100) * circumference;
    setCircleOffset(offset);
  }

  useEffect(() => {
    setProgress(percent);
  }, []);

  return (
    <div className={classes.progress}>
      <svg className={classes.progressRing} width="70" height="70">
        <circle
          className={classes.progressRingCircle}
          stroke="#2B7CE6"
          strokeOpacity="50%"
          strokeWidth="8"
          fill="transparent"
          r={radius}
          cx="35"
          cy="35"
        />
        <circle
          className={classes.progressRingCircle}
          stroke="#1E2362"
          strokeWidth="8"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={circleOffset}
          fill="transparent"
          r={radius}
          cx="35"
          cy="35"
        />
      </svg>
      <span>{percent}%</span>
    </div>
  );
}
