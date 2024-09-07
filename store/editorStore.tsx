'use client'
import { create } from "zustand";
import { v4 } from 'uuid';
import { stat } from "fs";



interface EditorState {
  layout: Block[];
  activeBlock: Block | null;
  
  addToLayout: (block: Block) => void;
  createBlock: (type: string) => string;
  addActiveBlockToLayout: () => void;
  setLoadedLayout: (layout: Block[]) => void;
}


export const useEditorStore = create<EditorState>()((set) => ({
  layout: [],
  activeBlock: null,
  addToLayout: (block) => set((state) => ({ layout: [...state.layout, block] })),
  createBlock: (type) => {
    
    const block: Block = {
      _id: v4(),
      blockTag: type,
      data: {},
    };
    
    set(() => ({activeBlock: block}))

    return block._id;
},
    
    addActiveBlockToLayout: () => set((state)=>{
    
        console.log('Save Active Block', state.activeBlock);
        if(state.activeBlock !== null){
            return {layout: [...state.layout, state.activeBlock]}
        }

        return {};

    }),

    setLoadedLayout: (layout) => set(() => ({layout}))

}));

