import React from 'react'
import { redirect } from "next/navigation";
import { delUser, logout } from "@/lib/auth/index";
import { getSession } from "@/lib/auth/tokenHandler";
import Link from "next/link";

import LoginForm from "./loginForm";
import classes from './authPop.component.scss'
import Image from 'next/image';


export default async function AuthPopUp({register, login}) {

    const session = await getSession();

    console.log(JSON.stringify(session, null, 2));

    if(login){
        return (
          <>
            <div className="popUp">
              <div className="popUp-bg" />
              <section className="form-section">

              <div className='form-header'>
                    <h1>Log in</h1>
                    <Link href="/" className='close-btn'>Close</Link>
              </div>
              <div className='form-main'>
                <div>
                    <div className='image-container'>
                    <Image src={'/traveler-reading-a-book.png'} width={880 / 3} height={851 / 3} alt="Women reading a book" />

                    </div>
                </div>
                <div className='form-holder'>
                    <LoginForm />
                </div>

              </div>
              </section>
            </div>
          </>
        );

    }


    if(register){
        return <div>Registration Form</div>
    }


}
