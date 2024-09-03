import React from 'react'
import { redirect } from "next/navigation";
import { delUser, logout } from "@/lib/auth/index";
import { getSession } from "@/lib/auth/tokenHandler";
import Link from "next/link";

import LoginForm from "./loginForm";
import classes from './authPop.module.scss'
import Image from 'next/image';
import RegisterForm from './registerForm';


export default async function AuthPopUp({register, login}) {

    const session = await getSession();
    if(login){
        return (
          <>
            <div className={classes.popUp}>
              <div className={classes.popUpBg} />
              <section className={classes.formSection}>

              <div className={classes.formHeader}>
                    <h1>Log in</h1>
                    <Link href="/" className={classes.closeBtn}>Close</Link>
              </div>
              <div className={classes.formMain}>
                <div>
                    <div className={classes.imageContainer}>
                    <Image src={'/traveler-reading-a-book.png'} width={880 / 3} height={851 / 3} alt="Women reading a book" />

                    </div>
                </div>
                <div className={classes.formHolder}>
                    <LoginForm />
                </div>

              </div>
              </section>
            </div>
          </>
        );

    }


    if(register){
        return (
          <>
            <div className={classes.popUp}>
              <div className={classes.popUpBg} />
              <section className={classes.formSection}>
                <div className={classes.formHeader}>
                  <h1>Register</h1>
                  <Link href="/" className={classes.closeBtn}>
                    Close
                  </Link>
                </div>
                <div className={classes.formMain}>
                  <div>
                    <div className={classes.imageContainer}>
                      <Image
                        src={"/traveler-reading-a-book.png"}
                        width={880 / 3}
                        height={851 / 3}
                        alt="Women reading a book"
                      />
                    </div>
                  </div>
                  <div className={classes.formHolder}>
                    <RegisterForm />
                  </div>
                </div>
              </section>
            </div>
          </>
        );
    }


}
