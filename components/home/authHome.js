import React from 'react'
import classes from './authHome.component.scss';
import CurrentReads from './currentReads/currentReads';

export default function AuthHome() {
  return (

    <>
        <div className='current-reads'>
            <CurrentReads />
        </div>
        <div className='reading-goals'>
            Reading Goals
        </div>
        <div className='reading-list'>
            Reading List
        </div>

        <div className='for-you-list'>
            For You List
        </div>

        <div className='your-groupes'>
            Your Groupes
        </div>
        <div className='placeholder-todo-one'>
            todo
        </div>

    </>

  )
}
