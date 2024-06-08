import styled from 'styled-components';
import Title from '../components/common/Title';
import BooksFilter from '../components/books/BooksFilter';
import BooksEmpty from '../components/books/BooksEmpty';
import BooksList from '../components/books/BooksList';
import Pagination from '../components/books/Pagination';
import BooksViewSwitcher from '../components/books/BooksViewSwitcher';
import { useBooks } from '../hooks/useBooks';
import Loading from '@/components/common/Loading';

export default function Books() {
  const { books, pagination, isEmpty, isBooksLoading } = useBooks();

  if (!books || !pagination || isBooksLoading) {
    return <Loading />;
  }

  return (
    <>
      <Title size='large'>도서 검색 결과</Title>
      <BooksStyle>
        <div className='filter'>
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        <BooksList books={books} />
        <Pagination pagination={pagination} />

        {isEmpty && <BooksEmpty />}
      </BooksStyle>
    </>
  );
}

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;
