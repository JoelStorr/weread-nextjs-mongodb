import React from 'react'
import classes from './profile.module.scss';
import Link from 'next/link';

const ProfilePage: React.FC = async ():Promise<React.JSX.Element>=>{

    

    return (
      <div className={classes.profile}>

        <Link href="/profile/editor">Edit</Link>

        <div className={classes.profileHeader}>
          <img
            src="/profile/profile-header.jpg"
            className={classes.profileBg}
          />
        </div>
        <div className={classes.profileInfo}>
          <img src="" className={classes.profileImage} />
          <div>
            <div>
              <span>@username</span>
              <span>name</span>
            </div>
            <div>
              <h4>Details</h4>
              <div>
                <p>
                  Follower <span>5</span>
                </p>
                <p>
                  Following <span>5</span>
                </p>
              </div>
              <div>
                <p>Location Germany</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1>Test Content</h1>
        </div>
      </div>
    );
}


export default ProfilePage;