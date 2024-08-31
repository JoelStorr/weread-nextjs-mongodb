import React from 'react'

import classes from './yourGroupes.module.scss';

export default function YourGroupes() {
  return (
    <>
      <section className={classes.yourGroupes}>
        <h3>Your Groupes</h3>
        <ul>
          <GroupeElement />
          <GroupeElement />
          <GroupeElement />
        </ul>
      </section>
    </>
  );
}

function GroupeElement(){

    return(
        <li className={classes.groupElement}>
            <img src="/profile/ProfileImage.png" />
            <div className={classes.infoHolder}>
                <h4>Group Name</h4>
                <p>Chapter 06  22.08</p>
                <div className={classes.progressHolder}>
                <div className={classes.progress}/>
                <div className={classes.progressBg} />
                </div>
            </div>
            
        </li>
    )
}