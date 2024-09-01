import React from 'react'
import classes from './progressBar.module.scss';

export default function ProgressBar({progress}) {

    if(!progress){
        progress = 0;
    }

    if(+progress){
        progress = `${progress}%`
    }

  return (
    <>
    <div className={classes.progressHolder}>
      <div className={classes.progress} style={{width: progress}} />
      <div className={classes.progressBg} />
    </div>

    </>
  );
}
