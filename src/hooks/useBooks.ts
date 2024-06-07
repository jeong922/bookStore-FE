import { useLocation } from 'react-router-dom';
import { fetchBooks } from '../api/books.api';
import { QUERYSTRING } from '../constants/querystring';
import { LIMIT } from '../constants/pagination';
import { useQuery } from '@tanstack/react-query';

export const useBooks = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const { data: booksData, isLoading: isBooksLoading } = useQuery({
    queryKey: ['books', location.search],
    queryFn: () =>
      fetchBooks({
        categoryId: params.get(QUERYSTRING.CATEGORY_ID)
          ? Number(params.get(QUERYSTRING.CATEGORY_ID))
          : undefined,
        newBook: params.get(QUERYSTRING.NEWS) ? true : undefined,
        page: params.get(QUERYSTRING.PAGE)
          ? Number(params.get(QUERYSTRING.PAGE))
          : 1,
        maxResults: LIMIT,
      }),
  });

  return {
    books: booksData?.books,
    pagination: booksData?.pagination,
    isEmpty: booksData?.books.length === 0,
    isBooksLoading,
  };
};
