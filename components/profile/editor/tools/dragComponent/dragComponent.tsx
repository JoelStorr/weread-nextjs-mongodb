import { useEditorStore } from "@/store/editorStore";
import { FC } from "react";


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

export default DragComponent;