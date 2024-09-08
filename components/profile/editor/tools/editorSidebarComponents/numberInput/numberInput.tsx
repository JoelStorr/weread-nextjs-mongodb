"use client";
import Image from "next/image";
import React, { ReactElement, useState } from "react";

import classes from "./numberInput.module.scss";
import baseClasses from "../base.module.scss";

interface NumberInput {
  number: string;
  onChange: () => void;
  name: string;
}

export default function NumberInput({ number, onChange, name }): ReactElement<NumberInput> {
  const [showPicker, setShowPicker] = useState<boolean>(false);

  return (
    <section className={baseClasses.picker}>
      <div
        onClick={() => setShowPicker(!showPicker)}
        className={baseClasses.header}
      >
        <h4>{name}: </h4>
        <Image
          className={showPicker ? baseClasses.arrowUp : baseClasses.arrowDown}
          src="/icons/arrow.png"
          width={35}
          height={35}
          alt="UI Arrow Down"
        />
      </div>
      {showPicker && (
        <div className={`${baseClasses.body} ${classes.body}`}>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="number"
              value={number}
              onChange={(e) => onChange(e.target.value)}
            />
          </form>
        </div>
      )}
    </section>
  );
}
