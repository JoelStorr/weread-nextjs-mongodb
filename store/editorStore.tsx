'use client'
import { create } from "zustand";
import { v4 } from 'uuid';

interface Block{
    _id: string;
    blockId: string;
    data: {};
}

interface EditorState {
  layout: Block[];
  activeBlock: Block | null;
  
  addToLayout: (block: Block) => void;
  createBlock: (type: string) => string;
}


export const useEditorStore = create<EditorState>()((set) => ({
  layout: [],
  activeBlock: null,
  addToLayout: (block) => set((state) => ({ layout: [...state.layout, block] })),
  createBlock: (type) => {
    
    const block: Block = {
      _id: v4(),
      blockId: type,
      data: {},
    };
    
    set(() => ({activeBlock: block}))

    return block._id;
}
}));

