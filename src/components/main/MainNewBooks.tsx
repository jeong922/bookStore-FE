import { Book } from '@/models/book.model';
import styled from 'styled-components';
import BookItem from '../books/BookItem';
import Empty from '../common/Empty';

interface Props {
  books: Book[];
}

export default function MainNewBooks({ books }: Props) {
  if (!books.length) {
    return <Empty title={'신간 도서가 없습니다.'} />;
  }
  return (
    <MainNewBooksStyle>
      {books.map((book) => (
        <BookItem key={book.id} book={book} view='grid' />
      ))}
    </MainNewBooksStyle>
  );
}

const MainNewBooksStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;
