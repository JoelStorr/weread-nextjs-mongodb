"use client";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { useEditorStore } from "@/store/editorStore";

import classes from "./editorPage.module.scss";
import { loadLayout, saveEditor } from "@/lib/editor";
import DragComponent from "@/components/profile/editor/tools/dragComponent/dragComponent";
import {
  EditorHeaderBlock,
  HeaderBlock,
  HeaderLibraryBlock,
} from "@/components/profile/editor/blocks/HeaderBlock/headerEditorBlock";
import PreviewManager from "@/components/profile/editor/tools/previewManager/previewManager";
import DropZone from "@/components/profile/editor/tools/dropZone/dropZone";
import { useRouter } from "next/navigation";

const Components = {
  "header-block": HeaderBlock,
};

const EditorComponents = {
  "header-block": EditorHeaderBlock,
};

const EditorPage: FC = () => {
  const { activeBlock, createBlock, layout, setLoadedLayout } =
    useEditorStore();

    const router = useRouter()

  // TODO: Style Editor Properly

  const saveLayout = async (): Promise<void> => {
    await saveEditor(layout);
    router.push("/profile");
    
  };

  useEffect(() => {
    (async () => {
      const result = await loadLayout();
      setLoadedLayout(result);
    })();
  }, []);

  return (
    <>
      <div className={classes.topBar}>
        <p>{activeBlock?.blockTag}</p>
        <button onClick={saveLayout}>Save</button>
      </div>
      <div className={classes.blockLibrary}>
        <h1>Block Library</h1>
        <ul>
          {/* TODO Make thes blocks render dynamically */}
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
          <li>
            <DropZone index={0} last={false} />
          </li>
          {layout.map((block, index) => (
            <li key={block._id}>
              <PreviewManager block={block} components={Components} />
              <DropZone index={index + 1} last={layout.length - 1 === index} />
            </li>
          ))}
          {layout.length === 0 && (
            <li>
              <DropZone index={layout.length} last={true} />
            </li>
          )}
        </ul>
      </div>

      <div className={classes.editor}>
        <h1>Editor</h1>
        <PreviewManager block={activeBlock} components={EditorComponents} />
      </div>
    </>
  );
};

export default EditorPage;
