'use client'
import React from 'react'

import classes from './unAuthHome.component.scss';

export default function UnAuthHome() {



  return (
    <>
      <div className="join-now-container">
        <img
          src="/man-stands-and-leans-forward.png"
          className="header-image-one"
        />
        <button
          onClick={() => {
            console.log("Clicked");
          }}
        >
          Join Now
        </button>
      </div>

      <div className="header-main">
        <h1 className="header-h1-main">WeRead</h1>
        <h2 className="header-h2-main">
          We read & talk <br /> together
        </h2>
      </div>
      <img src="/woman-reading-a-book.png" className="header-image-two" />

          <section className='cards-bg'>
            Cards
          </section>



    </>
  );
}
