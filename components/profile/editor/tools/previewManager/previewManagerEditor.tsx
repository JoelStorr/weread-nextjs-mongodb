"use client";
import { useEditorStore } from "@/store/editorStore";
import React, { FC } from "react";
import classes from "./previewManagerEditor.module.scss"

interface PreviewManagerEditorProps {
  block: Block | null;
  components: Components;
  preview: boolean;
}

const PreviewManagerEditor: FC<PreviewManagerEditorProps> = ({
  block,
  components,
  preview,
}: PreviewManagerEditorProps) => {
  const { activeBlock, exisitingBlockStatus } = useEditorStore();

  if (block === null) {
    return <></>;
  }

  function renderBlock() {
    if (block!.blockTag !== "undefined") {
      return React.createElement(components[block!.blockTag], {
        key: block!._id,
        block: block,
      });
    }
  }

  if (preview) {
    // NOTE: Makes child draggable when active

    if (block._id === activeBlock?._id) {
      return (
        <div
          className={classes.activeEl}
          draggable
          onDragStart={exisitingBlockStatus}
        >
          {renderBlock()}
        </div>
      );
    }
  }

  return <div onClick={exisitingBlockStatus}>{renderBlock()}</div>;
};

export default PreviewManagerEditor;
