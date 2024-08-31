import React from 'react';
import classes from './readingGoals.module.scss';

export default function ReadingGoals() {
  return (
    <>
        <section className=''>
            <div>
                <p>2024</p>
                <img src="" />
                <p>Reading <br/> Goals</p>
            </div>
            <div >
                <div className='progress'>
                    50%
                </div>
                <p><span>25</span> of <span>50</span> books</p>
                <button>Update</button>
            </div>
        </section>
    </>
  )
}
