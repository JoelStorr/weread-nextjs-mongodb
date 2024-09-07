"use client";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { useEditorStore } from "@/store/editorStore";

import classes from "./editorPage.module.scss";
import { loadLayout, saveEditor } from "@/lib/editor";

const EditorPage: FC = () => {
  const { activeBlock, createBlock, layout, setLoadedLayout } = useEditorStore();

  // TODO: Handle Component Library Panel
  // TODO: Handle Editor Panel
  // TODO: Handle Preview Panel

 

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
        <EditorManager block={activeBlock} />
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

const HeaderBlock: FC<{block: Block}> = ({block}) => {

    const {selectLayoutBlock, updateActiveBlock, updateLayoutBlock, activeBlock} = useEditorStore()

    const [titleState, setTitleState] = useState(block.data.title || "Placeholder Text")
     let timer: NodeJS.Timeout;

    const clickHandler = ():void =>{
        
        console.log('Clicked')

        if(activeBlock?._id !== block._id){
            selectLayoutBlock(block._id)
        }

    }


    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {

        setTitleState(e.target.value)

        console.log(e.target.value);

        clearTimeout(timer);

        timer = setTimeout(() => {
          console.log("Timer Ran");
          updateActiveBlock({ title: e.target.value });
          updateLayoutBlock();
        }, 2000);


    }


    console.log(block)



     return (
       <div onClick={clickHandler} className={classes.headerBlock}>
         <h1>{block.data.title}</h1>
         <form>
            <input value={titleState} onChange={handleChange} onFocus={e=>e.target.select()}/>
         </form>
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
          block: block,
        });
      }
    }


  return <>
    {renderBlock()}
  </>;
};




const EditorHeaderBlock: FC<HeaderBlock> = ({ id }) => {
  const { selectLayoutBlock, updateActiveBlock, updateLayoutBlock } = useEditorStore();

      let timer: NodeJS.Timeout;

    const changeHandler = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
        console.log(e.target.value)
      
        clearTimeout(timer)

        timer = setTimeout(()=>{

            console.log('Timer Ran')
            updateActiveBlock({title: e.target.value})
            updateLayoutBlock();

        }, 2000)

    };

  return (
    <div>
      <form>
            <label>
                Header Text <br/>
                <input onChange={changeHandler}/>
            </label>
      </form>
    </div>
  );
};


interface EditorManagerProps {
  block: Block | null;
}

const EditorComponents = {
  "header-block": EditorHeaderBlock,
};

const EditorManager: FC<EditorManagerProps> = ({
  block,
}: EditorManagerProps) => {
 
  if (block === null){
    return <></>;
  } 
 
 
function renderBlock() {
    if (block!.blockTag !== "undefined") {
      return React.createElement(EditorComponents[block!.blockTag], {
        key: block!._id,
        id: block!._id,
      });
    }
  }

  return <>{renderBlock()}</>;
};