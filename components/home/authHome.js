import React from 'react'
import classes from './authHome.module.scss';
import CurrentReads from './currentReads/currentReads';
import ReadingGoals from './readingGoals/readingGoals';
import ReadingLists from './readingLists/readingLists';

export default function AuthHome() {
  return (
    <>
      <div className={classes.currentReads}>
        <CurrentReads />
      </div>
      <div className={classes.readingGoals}>
        <ReadingGoals />
      </div>
      <div className={classes.readingList}>
        <ReadingLists />
      </div>

      <div className={classes.forYouList}>For You List</div>

      <div className={classes.yourGroupes}>Your Groupes</div>
      <div className={classes.placeholderTodoOne}>todo</div>
    </>
  );
}
