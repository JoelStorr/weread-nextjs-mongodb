"use client";
import Image from "next/image";
import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";

import classes from "./positionInput.module.scss";
import baseClasses from "../base.module.scss"

interface PositionInput {
  position: string;
  onChange: Dispatch<SetStateAction<string>>;
  name: string;
  options: Options[];
}

type Options = {
  name: string;
  value: string;
}

export default function PositionInput({
  position,
  onChange,
  name,
  options
}: PositionInput): ReactElement<PositionInput> {
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
            <select onChange={(e) => onChange(e.target.value)} value={position}>
              {options.map((val:Options)=>(
                <option value={val.value}>{val.name}</option>
              ))}
              
            </select>
          </form>
        </div>
      )}
    </section>
  );
}
