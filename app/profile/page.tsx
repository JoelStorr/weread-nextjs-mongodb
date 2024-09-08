import React from 'react'
import classes from './profile.module.scss';
import Link from 'next/link';
import { loadLayout } from '@/lib/profile';
import PreviewManager from '@/components/profile/profile/previewManager/previewManager';
import { HeadingBlock } from '@/components/profile/profile/blocks/HeadingBlock/headingBlock';
import { HeaderBlock } from '@/components/profile/profile/blocks/HeaderBlock/headerBlock';

const Components:Components = {
  "header-block": HeaderBlock,
  "heading-block": HeadingBlock,
};


const ProfilePage: React.FC = async ():Promise<React.JSX.Element>=>{


  const layout = await loadLayout("");

    return (
      <div className={classes.profile}>
        <div className={classes.editHolder}>
        <Link href={"/profile/editor"} className={classes.editBtn}>Edit</Link>

        </div>
        <ul>
          {layout.map((block) => (
            <li key={block._id}>
              <PreviewManager block={block} components={Components} />
            </li>
          ))}
          
        </ul>
      </div>
    );
}


export default ProfilePage;