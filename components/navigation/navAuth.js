'use client'
import React from 'react';
import { useState } from "react";
import Link from 'next/link';


export default function NavAuth({loginState}) {

        
       const [registerState, setRegisterState] = useState(false);

  return (
    <>
      <ul>
        <li><Link href="/?login=true">Log In</Link></li>
        <li><Link href="/?register=true">Register</Link></li>
      </ul>
    </>
  );
}
