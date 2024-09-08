import { useEditorStore } from "@/store/editorStore";
import { FC } from "react";
import classes from './dropZone.module.scss'


interface DropZoneProps{
  index: number
}


const DropZone: FC<DropZoneProps> = ({index}) => {
  const { addActiveBlockToLayout } = useEditorStore();

  const onDrop = (): void => {
    console.log("Element dropped");

    addActiveBlockToLayout(index);
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