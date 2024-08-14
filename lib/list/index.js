'use server';

import { getSession } from "../auth/tokenHandler";



export async function makeList(formData) {
    const name = formData.get("name");

    const session = await getSession();
    

    console.log(session);

}