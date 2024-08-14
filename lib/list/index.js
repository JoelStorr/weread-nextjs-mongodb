'use server';

import { getSession } from "../auth/tokenHandler";
import { getUser } from "../mongo/auth";
import { addList } from "../mongo/list";



export async function makeList(formData) {
    const name = formData.get("name");
    const privateList = formData.get("private")



    const result = await addList(name, privateList);
    
    

    console.log(result);

}