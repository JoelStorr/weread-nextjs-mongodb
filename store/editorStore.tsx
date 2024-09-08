"use client";
import { create } from "zustand";
import { v4 } from "uuid";

interface EditorState {
  layout: Block[];
  activeBlock: Block | null;
  activeBlockPosition: number | null;
  existingBlock: boolean;

  addToLayout: (block: Block) => void;
  createBlock: (type: string) => string;
  addActiveBlockToLayout: (index: number) => void;
  setLoadedLayout: (layout: Block[]) => void;
  selectLayoutBlock: (id: string) => void;
  updateLayoutBlock: ()=> void;
  updateActiveBlock: (data:{})=>void;
  deleteLayoutBlock: (id:string)=>void;
  exisitingBlockStatus: ()=>void
}

export const useEditorStore = create<EditorState>()((set) => ({
  layout: [],
  activeBlock: null,
  activeBlockPosition: null,
  existingBlock: false,
  addToLayout: (block) =>
    set((state) => ({ layout: [...state.layout, block] })),
  createBlock: (type) => {
    const block: Block = {
      _id: v4(),
      blockTag: type,
      data: {},
    };

    set(() => ({ activeBlock: block, exisitngBlock: false }));

    return block._id;
  },

  addActiveBlockToLayout: (index) =>
    set((state) => {
      console.log("Save Active Block", state.activeBlock);
      if (state.activeBlock !== null) {

        const manageArray = [...state.layout];

        if(state.existingBlock){
          let foundIndex = state.layout.findIndex((block) => block._id === state.activeBlock?._id);

          if (foundIndex !== -1) {

            manageArray.splice(index, 0, state.activeBlock);

            if(foundIndex > index){
              foundIndex++
            }

            manageArray.splice(foundIndex, 1);
          }
          console.log('Temp Updated Array', manageArray)

          return { layout: [...manageArray], existingBlock: false };

        }
          
          manageArray.splice(index, 0, state.activeBlock)

        

        return { layout: [...manageArray], existingBlock: false };
      }

      return {};
    }),

  setLoadedLayout: (layout) => set(() => ({ layout })),

  selectLayoutBlock: (id) =>
    set((state) => {
      let filteredBlock = state.layout.find((block) => block._id === id);
      if (filteredBlock) {
        console.log('Filtered Block Id', filteredBlock._id)
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

    }),
    exisitingBlockStatus: ()=>set((state) => ({existingBlock: true}))
    
}));
