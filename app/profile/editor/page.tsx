"use client";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { useEditorStore } from "@/store/editorStore";

import classes from "./editorPage.module.scss";
import { loadLayout, saveEditor } from "@/lib/editor";
import DragComponent from "@/components/profile/editor/tools/dragComponent/dragComponent";
import {
  EditorHeadingBlock,
  HeadingBlock,
  HeadingLibraryBlock,
} from "@/components/profile/editor/blocks/HeadingBlock/headingEditorBlock";
import DropZone from "@/components/profile/editor/tools/dropZone/dropZone";
import { useRouter } from "next/navigation";
import PreviewManagerEditor from "@/components/profile/editor/tools/previewManager/previewManagerEditor";
import { EditorHeaderBlock, HeaderBlock, HeaderLibraryBlock } from "@/components/profile/editor/blocks/HeaderBlock/headerEditorBlock";
import { EditorQuoteBlock, QuoteBlock, QuoteLibraryBlock } from "@/components/profile/editor/blocks/QuoteBlock/QuoteEditorBlock";




const Components:Components = {
  "header-block": HeaderBlock,
  "heading-block": HeadingBlock,
  "quote-block": QuoteBlock,
};

const EditorComponents:Components = {
  "header-block": EditorHeaderBlock,
  "heading-block": EditorHeadingBlock,
  "quote-block": EditorQuoteBlock

};

const EditorPage: FC = () => {
  const { activeBlock, createBlock, layout, setLoadedLayout } =
    useEditorStore();

  const router = useRouter();

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
    <div className={classes.editorHolder}>
      <div className={classes.topBar}>
        <p>Active Block: "{activeBlock?.blockTag}"</p>
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
          <li>
            <DragComponent blockTag="heading-block">
              <HeadingLibraryBlock />
            </DragComponent>
          </li>
          <li>
            <DragComponent blockTag="quote-block">
              <QuoteLibraryBlock />
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
              <PreviewManagerEditor
                block={block}
                components={Components}
                preview={true}
              />
              {layout.length - 1 !== index && (
                <DropZone index={index + 1} last={false} />
              )}
            </li>
          ))}

          <li>
            <DropZone index={layout.length} last={true} />
          </li>
        </ul>
      </div>

      <div className={classes.editor}>
        <h1>Editor</h1>
        <PreviewManagerEditor
          block={activeBlock}
          components={EditorComponents}
          preview={false}
        />
      </div>
    </div>
  );
};

export default EditorPage;
