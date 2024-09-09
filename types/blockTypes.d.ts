interface Block {
  _id: string;
  blockTag: string;
  data: BlockData;
}

interface BlockComponent{
  block: Block;
}

interface BlockData {
  title?: string;
  quote?: string;
  author?: string;
  style?: {
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    textAlign?: string;
    highlightColor?: string;
    imageCorner?: string;
    imageSize?: string;
  };
}


interface Components {
 "header-block": FC<BlockComponent>;
  "heading-block": FC<BlockComponent>;
  "quote-block": FC<BlockComponent>;
}

interface HeaderBlock{
  id: string;
}

