import { FC } from "react";
import classes from "./headerBlock.module.scss";

export const HeaderBlock: FC<BlockComponent> = ({ block }) => {
  return (
    <div
      className={classes.headerBlock}
      style={{ backgroundColor: block.data.style?.backgroundColor }}
    >
      <h1
        style={{
          textAlign: block.data.style?.textAlign,
          color: block.data.style?.color,
          fontSize: `${block.data.style?.fontSize}px`,
        }}
      >
        {block.data.title}
      </h1>
    </div>
  );
};
