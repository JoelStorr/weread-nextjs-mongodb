import React from "react";
import classes from "./profileUserPage.module.scss";
import Link from "next/link";
import { loadLayout } from "@/lib/profile";
import { HeadingBlock } from "@/components/profile/profile/blocks/HeadingBlock/headingBlock";
import PreviewManager from "@/components/profile/profile/previewManager/previewManager";

const Components:Components = {
  "heading-block": HeadingBlock,
};


interface ProfilePageUser {
  params: {
    username: string
  }
}

const ProfilePage: React.FC<ProfilePageUser> = async ({params}): Promise<React.JSX.Element> => {
  const layout = await loadLayout(params.username);

  return (
    <div className={classes.profile}>
      <ul>
        {layout.map((block) => (
          <li key={block._id}>
            <PreviewManager block={block} components={Components} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
