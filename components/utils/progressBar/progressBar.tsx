import React from "react";
import classes from "./progressBar.module.scss";

export default function ProgressBar({ progress }: { progress: number }) {
  let progressStr = `${progress}%`;

  return (
    <>
      <div className={classes.progressHolder}>
        <div className={classes.progress} style={{ width: progressStr }} />
        <div className={classes.progressBg} />
      </div>
    </>
  );
}
