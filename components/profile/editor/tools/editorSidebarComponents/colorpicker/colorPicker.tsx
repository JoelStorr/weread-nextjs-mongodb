'use client'
import Image from 'next/image';
import React, { ReactElement, useState } from 'react';
import { HexAlphaColorPicker } from 'react-colorful';
import classes from './colorPicker.module.scss';
import baseClasses from '../base.module.scss';



interface ColorPickerProps {
    color: string;
    onChange: ()=>void;
    name: string;
}

export default function ColorPicker({color, onChange, name}):ReactElement<ColorPickerProps> {

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
          <HexAlphaColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </section>
  );
}
