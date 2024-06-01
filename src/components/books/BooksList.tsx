import React from 'react';
import styled from 'styled-components';
import BookItem from './BookItem';
import { Book } from '../../models/book.model';

const dummyBook: Book = {
  id: 6,
  title: '춘식이인데요?',
  cover: 6,
  form: '종이책',
  author: '춘식이',
  isbn: '1111111111111',
  pages: 157,
  summary: '그냥 춘식이가 그린 만화',
  detail: '그냥 춘식이가 그린 만화모음이라고 해두자. 실존하지 않아..',
  contents: '목차임',
  price: 18900,
  publishedDate: '2024-04-07',
  category: '만화',
  likes: 0,
  liked: 0,
};

export default function BooksList() {
  return (
    <BooksListStyle>
      <BookItem book={dummyBook} />
    </BooksListStyle>
  );
}

const BooksListStyle = styled.div``;
