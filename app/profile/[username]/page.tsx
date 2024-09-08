import React from "react";
import classes from "./profileUserPage.module.scss";
import Link from "next/link";
import PreviewManager from "@/components/profile/editor/tools/previewManager/previewManager";
import { loadLayout } from "@/lib/profile";
import { HeaderBlock } from "@/components/profile/profile/blocks/HeaderBlock/headerBlock";

const Components = {
  "header-block": HeaderBlock,
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
