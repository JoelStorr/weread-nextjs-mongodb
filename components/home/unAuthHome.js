"use client";
import React from "react";

import classes from "./unAuthHome.component.scss";

export default function UnAuthHome() {
  return (
    <>
      {/* NOTE: Header */}
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

      {/* NOTE: Home cards */}
      <section className="card-section">
        <div className="card-holder">
          <div className="card card-one">
            <div>
              <h3>Track</h3>
              <img src="/icons/Journey.png" />
            </div>
            <p>
              Track your progress with detailed statistics and stay on track
              with your reading goals.
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
              Your perfect read can be an inspiration for others. Share your
              books & find your next read.
            </p>
          </div>
        </div>
      </section>

      {/* NOTE: Features */}
      <section className="feature-section">
        <div className="vertical-line" />
        <div className=" circle circle-one" />
        <div className="circle circle-two" />
        <div className="circle circle-three" />

        <div className="feature-element feature-one">
          <span>In Progress</span>
          <h2>Track your Progress</h2>
          <ul>
            <li>Capture your progress along each page</li>
            <li>Manage the status of each book</li>
            <li>Support for re-reading</li>
            <li>Organize your library into fitting lists</li>
          </ul>
          <h4>Want to keep a book for yourself?</h4>
          <p>Manage the visibility of your lists or individual books.</p>
        </div>
        <div className="feature-element feature-two">
          <span>Planed</span>
          <h2>Find your Community</h2>
          <ul>
            <li>Find the right people for your next read</li>
            <li>Set reading goals for the group</li>
            <li>Share your thoughts</li>
            <li>Vote on your next read together</li>
          </ul>
          <h4>Books are meant to be shared?</h4>
          <p>
            Our group chats allow for in-depth discussions about your favorite
            reads.
          </p>
          <h4>Want to make your Own?</h4>
          <p>
            We provide the tools to manage your group and keep each other safe.{" "}
            <br />
            Learn more about Groups.
          </p>
        </div>
        <div className="feature-element feature-three">
          <span>Planed</span>
          <h2>Custom Profiles</h2>
          <ul>
            <li>Build your own design</li>
            <li>Intuitive drag-and-drop UI Editor</li>
            <li>Show what matters to you</li>
            <li>Share your designs with the community</li>
          </ul>
          <h4>Want to show how you are?</h4>
          <p>
            Your profile should match how you are. Our drag-and-drop editor
            provides full flexibility when it comes to designing your profile
            page.
          </p>
        </div>
      </section>

      {/* NOTE: Quote */}
      <section className="quote-section">
        <p>“Reading is to the mind what exercise is to the body.”</p>
        <p>Joseph Addison</p>
      </section>
    </>
  );
};
