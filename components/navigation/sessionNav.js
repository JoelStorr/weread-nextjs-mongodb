"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";

export default function SessionAuth({ loginState }) {
  const [registerState, setRegisterState] = useState(false);

  return (
    <>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/community">Community</Link>
        </li>
      </ul>
    </>
  );
}
