
import { FC } from 'react';
import classes from './quoteBlock.module.scss'


export const QuoteBlock: FC<BlockComponent> = ({ block }) => {
  
  return (
    <div
      className={` ${classes.previewBlock}`}
      style={{ backgroundColor: block.data.style?.backgroundColor }}
    >
      <form>
        <h1
          style={{
            textAlign: block.data.style?.textAlign,
            color: block.data.style?.color,
            fontSize: `${block.data.style?.fontSize}px`,
          }}
        >
          <span
            style={{
              
              
              color: block.data.style?.color,
              fontSize: `${block.data.style?.fontSize / 1.5}px`,
            }}
          >
            "
          </span>

          {" " + block.data.quote +" "}
          <span
            style={{
              
             
              color: block.data.style?.color,
              fontSize: `${block.data.style?.fontSize / 1.5}px`,
            }}
          >
            "
          </span>
        </h1>

        <br />
        
        <h1
          style={{
            textAlign: block.data.style?.textAlign,
            color: block.data.style?.color,
            fontSize: `${block.data.style?.fontSize / 1.5}px`,
          }}
        >
          <span
            style={{
              display: "inline-block",
              textAlign: block.data.style?.textAlign,
              color: block.data.style?.color,
              fontSize: `${block.data.style?.fontSize / 1.5}px`,
            }}
          >
            by{"  "}
          </span>

          {" " + block.data.author}
        </h1>
      </form>
    </div>
  );
};
