interface UserInterface {
  _id: string;
  email: string;
  password: string;
  username: string;
  lists: ListInterface[];
}

interface ListInterface {
  name: string;
  private: boolean;
  books: BookProgressInterface[];
}

interface BookProgressInterface {
  bookId: string;
  pages: number;
  progress: number;
  percent: boolean;
  bookType: string;
}

interface BookInterface {
    _id: string,
    title: string,
    author: string[],
    cover: string,
    isbn: string,
    pages: number
}

interface StatisticsInterface{
    _id: string;
    userId: string;
    joinedDate: string;
    totalPages: number;
    yearList: []
}

interface ErrorInterface {
  error: string;
}
