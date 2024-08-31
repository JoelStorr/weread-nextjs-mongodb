import React from 'react'
import classes from './readingLists.module.scss';

export default function ReadingLists() {
  return (
    <>
        <section className={classes.readingLists}>
            <h3>Your Lists</h3>
            <ul>
                <li>My Bookshelf</li>
                <li>Favorites</li>
                <li>Wishlist</li>
                <li>More</li>
            </ul>
        </section>
    </>
  )
}
