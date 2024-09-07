import { useEditorStore } from "@/store/editorStore";
import { FC } from "react";
import classes from './dropZone.module.scss'

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


export default DropZone;