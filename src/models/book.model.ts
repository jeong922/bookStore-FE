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

// export interface BookReviewItem {
//   id: number;
//   bookId: number;
//   review: string;
//   createdAt: string;
//   updatedAt: string;
//   userId: number;
//   name: string;
//   email: string;
// }
export interface BookReviewItem {
  id: number;
  userName: string;
  content: string;
  score: number;
  createdAt: string;
}

export type BookReviewItemWrite = Pick<BookReviewItem, 'content' | 'score'>;
