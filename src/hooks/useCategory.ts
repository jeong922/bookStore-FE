import { useEffect, useState } from 'react';
import { Category } from '../models/category.model';
import { fetchCategory } from '../api/catagory.api';

export const useCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategory().then((category) => {
      if (!category) {
        return;
      }
      const categoryWithAll = [{ id: null, category: '전체' }, ...category];
      setCategory(categoryWithAll);
    });
  }, []);

  return { category };
};
