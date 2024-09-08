"use client";
import Image from "next/image";
import React, { ReactElement, useState } from "react";

import classes from "./numberInput.module.scss";

interface NumberInput {
  number: string;
  onChange: () => void;
  name: string;
}

export default function NumberInput({ number, onChange, name }): ReactElement<NumberInput> {
  const [showPicker, setShowPicker] = useState<boolean>(false);

  return (
    <section className={classes.picker}>
      <div
        onClick={() => setShowPicker(!showPicker)}
        className={classes.header}
      >
        <h4>{name}: </h4>
        <Image
          className={showPicker ? classes.arrowUp : classes.arrowDown}
          src="/icons/arrow.png"
          width={35}
          height={35}
          alt="UI Arrow Down"
        />
      </div>
      {showPicker && (
        <div className={classes.body}>
          <form onSubmit={e=>e.preventDefault()}>
            <input type="number" value={number} onChange={(e) => onChange(e.target.value)}/>
          </form>
        </div>
      )}
    </section>
  );
}
