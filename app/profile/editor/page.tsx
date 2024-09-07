'use client'
import React from 'react'
import {useEditorStore} from '@/store/editorStore';

 const EditorPage: React.FC = () => {

    const {activeBlock, createBlock} = useEditorStore();

     // TODO: Handle Component Library Panel
     // TODO: Handle Editor Panel
     // TODO: Handle Preview Panel

    // TODO: Save JSON representation of Profile
    // TODO: Load JSON representation of Profile

    // TODO: Build drag and drop element
        // TODO: Show Drop Zone when element is picked up
        //TODO: Handle UI Switch when dropping the element in drop Zone

    // TODO: Load indevidual Editor Compoents
        // TODO: Make elements inside the Editor components Editable
        // TODO: Save changes from Editor component to data structure
  return (
    <div>
        
        <h1>{activeBlock?.blockId} {activeBlock?._id}</h1>
        
        <button onClick={()=> createBlock("header")}>Add Block</button>

    </div>
  )
}

export default EditorPage;