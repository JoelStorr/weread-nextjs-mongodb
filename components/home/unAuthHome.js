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


        <div className='cards-bg'></div>

      <section className="card-holder">



        <div className="card card-one">
        <div>
          <h3>Track</h3>
          <img src="/icons/Journey.png" />
        </div>
          <p>
            Track your progress with detailed statistics and stay on track with
            your reading goals.
          </p>
        </div>
        <div className="card card-two">
        <div>
          <h3>Connect</h3>
          <img src="/icons/Connect.png" />
        </div>
          <p>
            Find the perfect group for your next read. Start your own reading
            club.
          </p>
        </div>
        <div className="card card-three">
          <div>
          <h3>Share</h3>
          <img src="/icons/Open Book.png" />
          </div>
          <p>
            Your perfect read can be an inspiration for others. Share your books
            & find your next read.
          </p>
        </div>
      </section>
    </>
  );
}
