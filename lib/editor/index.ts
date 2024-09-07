"use server"

import { getLayoutDB, saveLayoutDB } from "../mongo/profile";


export async function saveEditor(data:Block[]) {
    
        
    const jsonData = JSON.stringify(data);

    console.log(jsonData);
    
    try{
        const response = await saveLayoutDB(jsonData);

    } catch(error){
        console.log(error)
    }
    


}



export async function loadLayout():Promise<Block[]>{
    try{
        const result = await getLayoutDB();
        const jsonData:Block[] = await JSON.parse(result);
        return jsonData
    } catch(error){

        //TODO: Handle Error

        return []

    }
}