
import React, { FC, useEffect, useState } from 'react';
import classes from './headerEditorBlock.module.scss';
import { useEditorStore } from '@/store/editorStore';
import { HexAlphaColorPicker } from 'react-colorful';

// NOTE: Library Block
export const HeaderLibraryBlock: FC = () => {
  return (
    <div className={classes.headerLibraryBlock}>
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
    activeBlock
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
      updateActiveBlock({ ...block.data,  title: e.target.value });
      updateLayoutBlock();
    }, 2000);
  };

  console.log(block);

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {

    deleteLayoutBlock(block._id);

  };

  return (
    <div onClick={clickHandler} className={classes.headerBlock} style={{backgroundColor: block.data.style?.backgroundColor}}>
        <button className={classes.closeButton} onClick={handleDelete}>X</button>
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

export const EditorHeaderBlock: FC<BlockComponent> = ({block}) => {

    const [bgColor, setBgColor] = useState<string>(block.data.style?.backgroundColor || "#1e226200");
    const [color, setColor] = useState<string>(
      block.data.style?.color || "#1e2262"
    );
    const [fontSize, setFontSize] = useState<string>(block.data.style?.fontSize || "37");
    const [textAlign, setTextAlign] = useState<string>(block.data.style?.textAlign ||"left")

    const { selectLayoutBlock, updateActiveBlock, updateLayoutBlock } =
    useEditorStore();

  let timer: NodeJS.Timeout;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      console.log("Timer Ran");
      updateActiveBlock({...block.data, title: e.target.value });
      updateLayoutBlock();
    }, 2000);
  };


  useEffect(()=>{
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log("Timer Ran");
      updateActiveBlock({ ...block.data, style: {
        backgroundColor: bgColor,
        color: color,
        fontSize: fontSize,
        textAlign: textAlign
      } });
      updateLayoutBlock();
    }, 2000);
  }, [bgColor, color, fontSize, textAlign])

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* TODO: Color Picker */}
        <p>Test Data</p>
      </form>

      <section>
        <h4>Background Color: </h4>
        <HexAlphaColorPicker color={bgColor} onChange={setBgColor} />
      </section>

      <section>
        <h4>Color: </h4>
        <HexAlphaColorPicker color={color} onChange={setColor} />
      </section>
      <section>
        <h4>Font Size</h4>
        <input type='number' value={fontSize} onChange={(e)=>setFontSize(e.target.value)} />
      </section>
      <section>
        <h4>Position</h4>
        <select onChange={(e)=> setTextAlign(e.target.value)} value={textAlign}>
            <option value={"left"}>Left</option>
            <option value={"center"}>Center</option>
            <option value={"right"}>Right</option>
        </select>
      </section>
    </div>
  );
};
