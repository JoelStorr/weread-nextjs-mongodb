import React from 'react'
import classes from './forYou.module.scss';
import ProgressRing from '@/components/utils/progressRing/progressRing';


const ForYou: React.FC = () => {




  return (
    <>
      <section className={classes.forYou}>
        <h2>For You</h2>
        <ul>
          <ForYouItem />
          <ForYouItem />
          <ForYouItem />
          <ForYouItem />
          <ForYouItem />
        </ul>
      </section>
    </>
  );
}

export default ForYou;

const  ForYouItem: React.FC = () => {
    return(
        <li className={classes.forYouItem}>
            <div className={classes.userInfo}>
                <img src="/profile/ProfileImage.png" />
                <p><span>Emily</span> updated <span>The Prision Healer</span> <br/> by <span>Lynette Noni</span></p>
            </div>
            <div className={classes.bookInfo}>
            <div >
                <img src="/bookCover/prisionhealer.jpg"/>
                <div>
                    <p>
                        <span>The Prision Healer</span> <br/> by <span>Lynette Noni</span>
                    </p>

                    <button>Save</button>
                    
                </div>

            </div>
                <ProgressRing percent={0} />
            </div>

        </li>
    )
}