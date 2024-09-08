import React from 'react'
import classes from './profile.module.scss';
import Link from 'next/link';
import PreviewManager from '@/components/profile/editor/tools/previewManager/previewManager';
import { loadLayout } from '@/lib/profile';
import { HeaderBlock } from '@/components/profile/profile/blocks/HeaderBlock/headerBlock';

const Components = {
  "header-block": HeaderBlock,
};


const ProfilePage: React.FC = async ():Promise<React.JSX.Element>=>{


  const layout = await loadLayout("");

    return (
      <div className={classes.profile}>
        <Link href={"/profile/editor"}>Edit</Link>
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