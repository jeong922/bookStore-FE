import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useBook } from '../hooks/useBook';
import { getImgSrc } from '../utils/image';
import Title from '../components/common/Title';
import { BookDetail as IBookDetail } from '../models/book.model';
import { formatDate, formatNumber } from '../utils/format';
import EllipsisBox from '../components/common/EllipsisBox';
import LikeButton from '../components/book/LikeButton';
import AddToCart from '../components/book/AddToCart';

const bookInfoList = [
  {
    label: '카테고리',
    key: 'category',
    filter: (book: IBookDetail) => {
      return (
        <Link to={`/books?categoryId=${book.categoryId}`}>{book.category}</Link>
      );
    },
  },
  { label: '포맷', key: 'form' },
  { label: '페이지', key: 'pages' },
  { label: 'ISBN', key: 'isbn' },
  {
    label: '출간일',
    key: 'publishedDate',
    filter: (book: IBookDetail) => {
      return `${formatDate(book.publishedDate)}`;
    },
  },
  {
    label: '가격',
    key: 'price',
    filter: (book: IBookDetail) => {
      return `${formatNumber(book.price)}원`;
    },
  },
];

export default function BookDetail() {
  const { bookId } = useParams();
  const { book, likeToggle } = useBook(bookId);

  if (!book) {
    return null;
  }

  return (
    <BookDetailStyle>
      <header className='header'>
        <div className='img'>
          <img src={getImgSrc(book.cover)} alt={book.title} className='img' />
        </div>
        <div className='info'>
          <Title size='large' color='text'>
            {book.title}
          </Title>
          {bookInfoList.map((item) => (
            <dl key={item.key}>
              <dt>{item.label}</dt>
              <dd>
                {item.filter
                  ? item.filter(book)
                  : book[item.key as keyof IBookDetail]}
              </dd>
            </dl>
          ))}
          <EllipsisBox linelimit={2}>
            <p className='summary'>{book.summary}</p>
          </EllipsisBox>
          <div className='like'>
            <LikeButton book={book} onClick={likeToggle} />
          </div>
          <div className='add-cart'>
            <AddToCart book={book} />
          </div>
        </div>
      </header>
      <div className='content'>
        <Title size='medium'>상세 설명</Title>
        <EllipsisBox linelimit={4}>{book.detail}</EllipsisBox>
        <Title size='medium'>목차</Title>
        <pre className='index'>{book.contents}</pre>
      </div>
    </BookDetailStyle>
  );
}

const BookDetailStyle = styled.div`
  .header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;

    .img {
      flex: 1;
      img {
        width: 100%;
        height: auto;
      }
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;

      dl {
        display: flex;
        margin: 0;

        dt {
          width: 80px;
          color: ${({ theme }) => theme.color.secondary};
        }
        a {
          color: ${({ theme }) => theme.color.primary};
          text-decoration: none;
        }
      }
    }
  }

  .content {
    .detail {
      /* overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical; */
    }
  }
`;
