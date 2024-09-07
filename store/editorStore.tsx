"use client";
import { create } from "zustand";
import { v4 } from "uuid";

interface EditorState {
  layout: Block[];
  activeBlock: Block | null;

  addToLayout: (block: Block) => void;
  createBlock: (type: string) => string;
  addActiveBlockToLayout: () => void;
  setLoadedLayout: (layout: Block[]) => void;
  selectLayoutBlock: (id: string) => void;
  updateLayoutBlock: ()=> void;
  updateActiveBlock: (data:{})=>void;
  deleteLayoutBlock: (id:string)=>void;
}

export const useEditorStore = create<EditorState>()((set) => ({
  layout: [],
  activeBlock: null,
  addToLayout: (block) =>
    set((state) => ({ layout: [...state.layout, block] })),
  createBlock: (type) => {
    const block: Block = {
      _id: v4(),
      blockTag: type,
      data: {},
    };

    set(() => ({ activeBlock: block }));

    return block._id;
  },

  addActiveBlockToLayout: () =>
    set((state) => {
      console.log("Save Active Block", state.activeBlock);
      if (state.activeBlock !== null) {
        return { layout: [...state.layout, state.activeBlock] };
      }

      return {};
    }),

  setLoadedLayout: (layout) => set(() => ({ layout })),

  selectLayoutBlock: (id) =>
    set((state) => {
      let filteredBlock = state.layout.find((block) => block._id === id);
      if (filteredBlock) {
        return { activeBlock: filteredBlock };
      }

      return {};
    }),

    updateLayoutBlock: ()=>set((state) => {

        const updateLayout = state.layout.map(block => {
            return block._id !== state.activeBlock?._id ? block : state.activeBlock}
        )

        return {layout: updateLayout}
    }),

    updateActiveBlock: (data)=>set((state)=>{

        if(state.activeBlock === null) return {}

        return {activeBlock: {...state.activeBlock, data}}

        
    }),

    deleteLayoutBlock: (id)=>set((state)=>{

        let index = state.layout.findIndex((block)=> block._id === id);
    
        if(index == -1 ){
            return {}
        }

        let layoutCopy = [...state.layout];
        layoutCopy.splice(index, 1)
        return {layout: [...layoutCopy]}

    })
}));
