export interface Book {
  id: number;
  title: string;
  cover: number;
  form: string;
  author: string;
  isbn: string;
  pages: number;
  summary: string;
  detail: string;
  contents: string;
  price: number;
  publishedDate: string;
  category: string;
  categoryId: number;
  likes: number;
  liked: number;
}

export interface BookDetail extends Book {}
