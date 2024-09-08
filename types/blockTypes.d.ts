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
  style?: {
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    textAlign?: string;
    highlightColor?:string;
  };
}


interface Components {
 "header-block": FC<BlockComponent>;
  "heading-block": FC<BlockComponent>;
}

interface HeaderBlock{
  id: string;
}

