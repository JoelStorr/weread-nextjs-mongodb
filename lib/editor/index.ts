"use server"

import { redirect } from "next/navigation";
import { getLayoutDB, saveLayoutDB } from "../mongo/profile";
import { UserInfo } from "os";
import { UserInterfacePublic } from "@/types/types";
import { checkUser } from "../mongo/auth";


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
        const result = await getLayoutDB("");
        const jsonData:Block[] = await JSON.parse(result);
        return jsonData
    } catch(error){

        //TODO: Handle Error

        return []

    }
}


export async function loadUserInfo():Promise<UserInterfacePublic>{

    const user = await checkUser()

    return{
        _id: user._id,
        username: user.username,
        lists: user.lists
    }

}