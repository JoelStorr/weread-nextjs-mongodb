'use client'
import { useEditorStore } from "@/store/editorStore";
import { FC, useState } from "react";
import classes from './dropZone.module.scss'


interface DropZoneProps{
  index: number,
  last: boolean,
}


const DropZone: FC<DropZoneProps> = ({index, last}) => {
  
     const [showDrop, setShowDrop] = useState(last);
     const [activeDrop, setActiveDrop] = useState(false);
     const handleCSSClasses = () => {
       if (showDrop) {
         return activeDrop ? `${classes.dropZone} ${classes.dropAreaActive}` : classes.dropZone;
       } else {
         return classes.hideDropArea;
       }
     };
  
  
  
  const { addActiveBlockToLayout } = useEditorStore();

  const onDrop = (): void => {
    addActiveBlockToLayout(index);
    setShowDrop(false);
    setActiveDrop(false);
  };

  return (
    <div
      onDragEnter={() => {
        setShowDrop(true);
        setActiveDrop(true);
      }}
      onDragLeave={() => {
        setShowDrop(last);
        setActiveDrop(false);
      }}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className={handleCSSClasses()}
    >
      Drop Zone
    </div>
  );
};


export default DropZone;