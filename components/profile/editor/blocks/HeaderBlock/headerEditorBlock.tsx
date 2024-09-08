import React, { FC, useEffect, useState } from "react";
import classes from "./headerEditorBlock.module.scss";
import baseClasses from '../base.module.scss';
import { useEditorStore } from "@/store/editorStore";
import ColorPicker from "../../tools/editorSidebarComponents/colorpicker/colorPicker";
import NumberInput from "../../tools/editorSidebarComponents/numberInput/numberInput";
import PositionInput from "../../tools/editorSidebarComponents/positionInput/positionInput";
import { loadUserInfo } from "@/lib/editor";
import { UserInterfacePublic } from "@/types/types";

// NOTE: Library Block
export const HeaderLibraryBlock: FC = () => {
  return (
    <div className={baseClasses.libraryBlock}>
      <h5>Header Block</h5>
    </div>
  );
};

// NOTE: Preview Block

export const HeaderBlock: FC<BlockComponent> = ({ block }) => {
  const {
    selectLayoutBlock,
    updateActiveBlock,
    updateLayoutBlock,
    deleteLayoutBlock,
    activeBlock,
  } = useEditorStore();

  const [titleState, setTitleState] = useState(
    block.data.title || "Your Name"
  );

  const [user, setUser] = useState<UserInterfacePublic>({_id: "", username:"", lists:[]})
  let timer: NodeJS.Timeout;


  useEffect(()=>{
    (async ()=>{
      const user = await loadUserInfo()
      setUser(user);
    })()
  }, [])

  const clickHandler = (): void => {
    console.log("Clicked");

    if (activeBlock?._id !== block._id) {
      selectLayoutBlock(block._id);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitleState(e.target.value);

    console.log(e.target.value);

    clearTimeout(timer);

    timer = setTimeout(() => {
      console.log("Timer Ran");
      updateActiveBlock({ ...block.data, title: e.target.value });
      updateLayoutBlock();
    }, 2000);
  };

  console.log(block);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    deleteLayoutBlock(block._id);
  };

  return (
    <div
      onClick={clickHandler}
      className={`${baseClasses.previewBlock} ${classes.previewBlock}`}
      style={{ backgroundColor: block.data.style?.backgroundColor }}
    >
      <button className={baseClasses.closeButton} onClick={handleDelete}>
        X
      </button>
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
              <h3 style={{ color: block.data.style?.color }}>
                @{user.username}
              </h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  value={titleState}
                  onChange={handleChange}
                  placeholder="name"
                  style={{ color: block.data.style?.color }}
                />
              </form>
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

// NOTE: Editor Block

export const EditorHeaderBlock: FC<BlockComponent> = ({ block }) => {
  const [bgColor, setBgColor] = useState<string>(
    block.data.style?.backgroundColor || "#1e226200"
  );
  const [color, setColor] = useState<string>(
    block.data.style?.color || "#1e2262"
  );

  const [highlightColor, setHighlightColor] = useState<string>(
    block.data.style?.color || "#1b919a"
  );
  const [fontSize, setFontSize] = useState<string>(
    block.data.style?.fontSize || "37"
  );
  const [textAlign, setTextAlign] = useState<string>(
    block.data.style?.textAlign || "left"
  );

  const { updateActiveBlock, updateLayoutBlock } =
    useEditorStore();

  let timer: NodeJS.Timeout;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      console.log("Timer Ran");
      updateActiveBlock({ ...block.data, title: e.target.value });
      updateLayoutBlock();
    }, 2000);
  };

  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log("Timer Ran");
      updateActiveBlock({
        ...block.data,
        style: {
          backgroundColor: bgColor,
          color: color,
          highlightColor: highlightColor,
          textAlign: textAlign,
        },
      });
      updateLayoutBlock();
    }, 2000);
  }, [bgColor, color, fontSize, textAlign, highlightColor]);

  return (
    <div>
      <ColorPicker
        color={bgColor}
        onChange={setBgColor}
        name={"Background Color"}
      />
      <ColorPicker color={color} onChange={setColor} name={"Text Color"} />
      <ColorPicker color={highlightColor} onChange={setHighlightColor} name={"Highlight Color"} />
      <PositionInput
        position={textAlign}
        onChange={setTextAlign}
        name="Position"
        options={[{name: "left", value:"row"}, {name:"right", value:"row-reverse"}]}
      />
    </div>
  );
};
