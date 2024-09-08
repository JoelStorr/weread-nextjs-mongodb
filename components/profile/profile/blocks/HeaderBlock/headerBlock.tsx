import { FC } from "react";
import classes from "./headerBlock.module.scss";
import { loadUserInfo } from "@/lib/editor";
export const HeaderBlock: FC<BlockComponent> = async ({ block }) => {

  const user = await loadUserInfo();

  return (
    <div
      className={` ${classes.headerBlock}`}
      style={{ backgroundColor: block.data.style?.backgroundColor }}
    >
      <div className={classes.profileHeader}>
        <img src="/profile/profile-header.jpg" className={classes.bgImage} />
        <div
          className={classes.profileInfoHolder}
          style={{
            flexDirection: block.data.style?.textAlign,
          }}
        >
          <img src="/profile/ProfileImage.png" />
          <div
            className={classes.profileDetails}
            style={{ color: block.data.style?.color }}
          >
            <div
              className={classes.userTags}
              style={{ color: block.data.style?.color }}
            >
              <h3 style={{ color: block.data.style?.color }}>@{user.username}</h3>
              
                <p
                  style={{ color: block.data.style?.color }}
                >{block.data.title}</p>
              
              <h4 style={{ color: block.data.style?.color }}>Details:</h4>
            </div>
            <div className={classes.detailHolder}>
              <div>
                <p style={{ color: block.data.style?.color }}>
                  Follower{" "}
                  <span
                    style={{
                      backgroundColor: block.data.style?.highlightColor,
                    }}
                  >
                    5
                  </span>
                </p>
                <p style={{ color: block.data.style?.color }}>
                  Folloing{" "}
                  <span
                    style={{
                      backgroundColor: block.data.style?.highlightColor,
                    }}
                  >
                    5
                  </span>
                </p>
              </div>
              <div>
                <p style={{ color: block.data.style?.color }}>
                  Location{" "}
                  <span
                    style={{
                      backgroundColor: block.data.style?.highlightColor,
                    }}
                  >
                    Germany
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};