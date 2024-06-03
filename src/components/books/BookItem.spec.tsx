import { render } from '@testing-library/react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import { Book } from '../../models/book.model';
import BookItem from './BookItem';
import { formatNumber } from '../../utils/format';
import { getImgSrc } from '../../utils/image';

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
  categoryId: 2,
  likes: 0,
  liked: 0,
};

describe('BookItem 테스트', () => {
  it('렌더 여부', () => {
    const { getByText, getByAltText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );

    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText(`${formatNumber(dummyBook.price)}원`)).toBeInTheDocument();
    expect(getByText(dummyBook.likes)).toBeInTheDocument();
    expect(getByAltText(dummyBook.title)).toHaveAttribute(
      'src',
      `${getImgSrc(dummyBook.cover)}`
    );
  });
});
