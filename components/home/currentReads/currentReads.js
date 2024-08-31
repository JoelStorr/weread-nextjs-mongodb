import React from 'react'
import classes from './currentReads.module.scss'

export default function CurrentReads() {
  return (
    <>
        <h2>Current Reads</h2>
        <ul>
            <CurrentBook />
            <CurrentBook />
            <CurrentBook />
        </ul>
    </>
  )
}


function CurrentBook(){
    return (
      <li className={classes.currentBookElement}>
        <img src="/bookCover/cover.webp" />
        <div>
          <h3>Book Cover</h3>
          <p>
            by <span>Author Name</span>
          </p>
          <div className={classes.progress}>progress bar</div>
          <button>Udate</button>
        </div>
      </li>
    );
}