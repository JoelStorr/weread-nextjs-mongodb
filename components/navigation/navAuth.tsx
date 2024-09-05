
import React from 'react';
import Link from 'next/link';


const  NavAuth: React.FC = () => {

  return (
    <>
      <ul>
        <li><Link href="/?login=true">Log In</Link></li>
        <li><Link href="/?register=true">Register</Link></li>
      </ul>
    </>
  );
}

export default NavAuth;