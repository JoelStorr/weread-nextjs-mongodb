import React from 'react'
import classes from './currentReads.module.scss'

export default function CurrentReads() {
  return (
    <>
        <h3>Current Reads</h3>
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
          <h4>Book Cover</h4>
          <p>
            by <span>Author Name</span>
          </p>
          <div className={classes.progress}>progress bar</div>
          <button>Udate</button>
        </div>
      </li>
    );
}