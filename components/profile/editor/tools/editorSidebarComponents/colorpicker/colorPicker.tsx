'use client'
import Image from 'next/image';
import React, { ReactElement, useState } from 'react'
import { HexAlphaColorPicker } from 'react-colorful';
import classes from './colorPicker.module.scss'


interface ColorPickerProps {
    color: string;
    onChange: ()=>void;
    name: string;
}

export default function ColorPicker({color, onChange, name}):ReactElement<ColorPickerProps> {

    const [showPicker, setShowPicker] = useState<boolean>(false);


  return (
    <section className={classes.picker}>
        <div onClick={()=>setShowPicker(!showPicker)} className={classes.header}>
            <h4>{name}: </h4> 
            <Image className={showPicker ? classes.arrowUp: classes.arrowDown} src='/icons/arrow.png' width={35} height={35} alt="UI Arrow Down" />
        </div>
        {showPicker && (
            <div className={classes.body}>
                <HexAlphaColorPicker color={color} onChange={onChange} />
            </div>
        )}
    </section>
  );
}
