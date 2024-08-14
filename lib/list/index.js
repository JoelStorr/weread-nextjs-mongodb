'use server';

import { getSession } from "../auth/tokenHandler";
import { getUser } from "../mongo/auth";
import { addList, getLists as getListsDB } from "../mongo/list";



export async function makeList(prevData, formData) {
    const name = formData.get("name");
    const privateList = formData.get("private")
    const result = await addList(name, privateList);
    
    return {result}
}


export async function getLists(){
    return await getListsDB()
}


