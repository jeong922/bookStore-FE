import { Cart } from './../models/cart.model';
import { httpClient } from './http';

interface AddCartParams {
  bookId: number;
  quantity: number;
}

export const addCart = async (params: AddCartParams) => {
  const reponse = await httpClient.post(`/carts`, params);
  return reponse.data;
};

export const fetchCart = async () => {
  const reponse = await httpClient.get<Cart[]>(`/carts`);
  return reponse.data;
};

export const deleteCart = async (cartId: number) => {
  const reponse = await httpClient.delete(`/carts/${cartId}`);
  return reponse.data;
};
