"use server"
import { UserInterface, UserInterfaceSearch } from "@/types/types";
import { getUserName } from "../mongo/auth";


export async function getUserByName(username: string):Promise<UserInterfaceSearch | null> {


    let usernameArr = username.split("")
    usernameArr.splice(0,1)
    username = usernameArr.join("");
    console.log(username);

    try{
        const user = await getUserName(username)
        console.log(user)

        if(user === null) return null;


        const searchUser:UserInterfaceSearch = {
            _id: user._id,
            username: user.username
        }

        return searchUser;
    } catch (error){

        console.log(error);
        return null;
    }


}