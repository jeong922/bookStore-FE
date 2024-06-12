import { Book } from '@/models/book.model';
import { http, HttpResponse } from 'msw';
import { fakerKO as faker } from '@faker-js/faker';

const bestBooksData: Book[] = Array.from({ length: 10 }).map((item, index) => ({
  id: index,
  title: faker.lorem.sentence(),
  cover: faker.helpers.rangeToNumber({ min: 100, max: 200 }),
  form: 'eBook',
  author: faker.person.firstName(),
  isbn: faker.commerce.isbn(),
  pages: faker.helpers.rangeToNumber({ min: 100, max: 500 }),
  summary: faker.lorem.paragraph(),
  detail: faker.lorem.paragraph(),
  contents: faker.lorem.paragraph(),
  price: faker.helpers.rangeToNumber({ min: 10000, max: 50000 }),
  publishedDate: faker.date.past().toISOString(),
  category: '소설',
  categoryId: 1,
  likes: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
  liked: 0,
}));

export const bestBooks = http.get('http://localhost:8080/books/best', () => {
  return HttpResponse.json(bestBooksData, {
    status: 200,
  });
});
