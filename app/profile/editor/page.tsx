"use client";
import React, { FC, ReactNode, useEffect } from "react";
import { useEditorStore } from "@/store/editorStore";

import classes from "./editorPage.module.scss";
import { loadLayout, saveEditor } from "@/lib/editor";

const EditorPage: FC = () => {
  const { activeBlock, createBlock, layout, setLoadedLayout } = useEditorStore();

  // TODO: Handle Component Library Panel
  // TODO: Handle Editor Panel
  // TODO: Handle Preview Panel

  // TODO: Save JSON representation of Profile
  // TODO: Load JSON representation of Profile

  // TODO: Build drag and drop element
  // TODO: Show Drop Zone when element is picked up
  //TODO: Handle UI Switch when dropping the element in drop Zone

  // TODO: Load indevidual Editor Compoents
  // TODO: Make elements inside the Editor components Editable
  // TODO: Save changes from Editor component to data structure


  const saveLayout = async():Promise<void> =>{

    saveEditor(layout);

  }


  useEffect(()=>{
    (async ()=>{
        const result = await loadLayout();
        setLoadedLayout(result);

    })();
  },[])

  return (
    <>
      
      <div className={classes.topBar}>
      <p>{activeBlock?.blockTag}</p>
      <button onClick={saveLayout}>Save</button>

      </div>
      <div className={classes.blockLibrary}>
        <h1>Block Library</h1>
        <ul>
          <li>
            <DragComponent blockTag="header-block">
              <HeaderLibraryBlock />
            </DragComponent>
          </li>
        </ul>
      </div>

      <div className={classes.preview}>
        <h1>Preview</h1>
        <ul>
          {layout.map((block) => (
            <li key={block._id}>
              <PreviewManager block={block}/>
            </li>
          ))}
          <li>
            <DropZone />
          </li>
        </ul>
      </div>

      <div className={classes.editor}>
        <h1>Editor</h1>
      </div>
    </>
  );
};

export default EditorPage;

type DragProps = {
  blockTag: string;
  children: React.ReactNode;
};

const DragComponent: FC<DragProps> = ({ children, blockTag }: DragProps) => {
  const { createBlock } = useEditorStore();

  const dragStart = (): void => {
    createBlock(blockTag);
  };

  return (
    <div draggable onDragStart={dragStart}>
      {children}
    </div>
  );
};

const HeaderLibraryBlock: FC = () => {
  return (
    <div className={classes.headerLibraryBlock}>
      <h5>Header Block</h5>
    </div>
  );
};

const HeaderBlock: FC = () => {
  return (
    <div>
      <h1>Placeholder Text</h1>
    </div>
  );
};

const DropZone: FC = () => {
  const { addActiveBlockToLayout } = useEditorStore();

  const onDrop = (): void => {
    console.log("Element dropped");

    addActiveBlockToLayout();
  };

  return (
    <div
      className={classes.dropZone}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <h4>Drop Zone</h4>
    </div>
  );
};

interface PreviewManagerProps {
  block: Block;
}

const Components = {
    'header-block': HeaderBlock,
}

const PreviewManager: FC<PreviewManagerProps> = ({
  block,
}: PreviewManagerProps) => {

    function renderBlock() {
      if (block.blockTag !== "undefined") {
        return React.createElement(Components[block.blockTag], {
          key: block._id,
        });
      }
    }


  return <>
    {renderBlock()}
  </>;
};
