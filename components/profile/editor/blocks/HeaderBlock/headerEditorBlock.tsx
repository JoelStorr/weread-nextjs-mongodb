
import React, { FC, useState } from 'react';
import classes from './headerEditorBlock.module.scss';
import { useEditorStore } from '@/store/editorStore';

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
      updateActiveBlock({ title: e.target.value });
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
    <div onClick={clickHandler} className={classes.headerBlock}>
        <button className={classes.closeButton} onClick={handleDelete}>X</button>
      <form>
        <input
          value={titleState}
          onChange={handleChange}
          onFocus={(e) => e.target.select()}
        />
      </form>
    </div>
  );
};


// NOTE: Editor Block

export const EditorHeaderBlock: FC<BlockComponent> = ({block}) => {
  const { selectLayoutBlock, updateActiveBlock, updateLayoutBlock } =
    useEditorStore();

  let timer: NodeJS.Timeout;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    clearTimeout(timer);

    timer = setTimeout(() => {
      console.log("Timer Ran");
      updateActiveBlock({ title: e.target.value });
      updateLayoutBlock();
    }, 2000);
  };

  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        {/* TODO: Color Picker */}
        <p>Test Data</p>
      </form>
    </div>
  );
};
