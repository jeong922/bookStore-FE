import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BookDetail } from '../models/book.model';
import { fetchBook, likeBook, unlikeBook } from '../api/books.api';
import { useAuthStore } from '../store/authStore';
import { useAlert } from './useAlert';
import { addCart } from '../api/carts.api';

export const useBook = (bookId: string | undefined) => {
  const navigate = useNavigate();
  const [book, setBook] = useState<BookDetail | null>(null);
  const [cartAdded, setCartAdded] = useState(false);
  const { isloggedIn } = useAuthStore();
  const { showAlert } = useAlert();

  const likeToggle = () => {
    if (!isloggedIn) {
      showAlert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    if (!book) {
      return;
    }

    if (book.liked) {
      // 라이크 -> 언라이크
      unlikeBook(book.id).then(() => {
        setBook({ ...book, liked: 0, likes: book.likes - 1 });
      });
    } else {
      // 언라이크 -> 라이크
      likeBook(book.id).then(() => {
        setBook({ ...book, liked: 1, likes: book.likes + 1 });
      });
    }
  };

  const addToCart = (quantity: number) => {
    if (!book) {
      return;
    }

    addCart({
      bookId: book.id,
      quantity,
    })
      .then(() => {
        setTimeout(() => {
          setCartAdded(true);
        }, 3000);
      })
      .catch((error) => {
        showAlert('로그인이 필요합니다.');
        navigate('/login');
      });
  };

  useEffect(() => {
    if (!bookId) {
      return;
    }

    fetchBook(bookId).then((book) => {
      setBook(book);
    });
  }, [bookId]);

  return { book, likeToggle, addToCart, cartAdded };
};
