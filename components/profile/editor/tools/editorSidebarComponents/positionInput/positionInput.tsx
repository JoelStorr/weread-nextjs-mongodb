"use client";
import Image from "next/image";
import React, { ReactElement, useState } from "react";

import classes from "./positionInput.module.scss";

interface PositionInput {
  position: string;
  onChange: () => void;
  name: string;
}

export default function PositionInput({
  position,
  onChange,
  name,
}): ReactElement<PositionInput> {
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
          <form onSubmit={(e) => e.preventDefault()}>
            <select
              onChange={(e) => onChange(e.target.value)}
              value={position}
            >
              <option value={"left"}>Left</option>
              <option value={"center"}>Center</option>
              <option value={"right"}>Right</option>
            </select>
          </form>
        </div>
      )}
    </section>
  );
}
