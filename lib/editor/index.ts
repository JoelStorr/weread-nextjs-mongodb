"use server"

import { saveLayoutDB } from "../mongo/profile";


export async function saveEditor(data:Block[]) {
    
        
    const jsonData = JSON.stringify(data);

    console.log(jsonData);
    
    try{
        const response = await saveLayoutDB(jsonData);

    } catch(error){
        console.log(error)
    }
    


}