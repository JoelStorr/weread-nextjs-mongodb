import React from 'react'
import classes from './currentReads.module.scss'
import ProgressBar from '@/components/utils/progressBar/progressBar';

export default function CurrentReads() {
  return (
    <div className={classes.currentReadsList}>
        <h3>Current Reads</h3>
        <ul>
            <CurrentBook />
            <CurrentBook />
            <CurrentBook />
        </ul>
    </div>
  )
}


function CurrentBook(){
    return (
      <li className={classes.currentBookElement}>
        <img src="/bookCover/cover.webp" />
        <div>
          <h4>Book Title</h4>
          <p>
            by <span>Author Name</span>
          </p>
          <ProgressBar progress={40} />
          <button>Udate</button>
        </div>
      </li>
    );
}