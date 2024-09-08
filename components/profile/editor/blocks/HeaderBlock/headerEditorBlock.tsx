import React, { FC, useEffect, useState } from "react";
import classes from "./headerEditorBlock.module.scss";
import baseClasses from '../base.module.scss';
import { useEditorStore } from "@/store/editorStore";
import ColorPicker from "../../tools/editorSidebarComponents/colorpicker/colorPicker";
import NumberInput from "../../tools/editorSidebarComponents/numberInput/numberInput";
import PositionInput from "../../tools/editorSidebarComponents/positionInput/positionInput";

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
    block.data.title || "Placeholder Text"
  );
  let timer: NodeJS.Timeout;

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
      <form>
        <input
          value={titleState}
          onChange={handleChange}
          onFocus={(e) => e.target.select()}
          style={{
            textAlign: block.data.style?.textAlign,
            color: block.data.style?.color,
            fontSize: `${block.data.style?.fontSize}px`,
          }}
        />
      </form>
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
  const [fontSize, setFontSize] = useState<string>(
    block.data.style?.fontSize || "37"
  );
  const [textAlign, setTextAlign] = useState<string>(
    block.data.style?.textAlign || "left"
  );

  const { selectLayoutBlock, updateActiveBlock, updateLayoutBlock } =
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
          fontSize: fontSize,
          textAlign: textAlign,
        },
      });
      updateLayoutBlock();
    }, 2000);
  }, [bgColor, color, fontSize, textAlign]);

  return (
    <div>
      <ColorPicker
        color={bgColor}
        onChange={setBgColor}
        name={"Background Color"}
      />
      <ColorPicker color={color} onChange={setColor} name={"Text Color"} />
      <NumberInput number={fontSize} onChange={setFontSize} name="Font Size" />
      <PositionInput
        position={textAlign}
        onChange={setTextAlign}
        name="Position"
      />
    </div>
  );
};
