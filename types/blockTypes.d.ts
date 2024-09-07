interface Block {
  _id: string;
  blockTag: string;
  data: BlockData;
}


interface BlockData {
  title?: string;
}

interface HeaderBlock{
  id: string;
}