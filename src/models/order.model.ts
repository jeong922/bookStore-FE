import { Cart } from './cart.model';
import { Pagination } from './pagination.model';

export interface Order {
  id: number;
  createdAt: string;
  bookTitle: string;
  totalPrice: number;
  totalQuantity: number;
  paymentInformation: string;
  address: string;
  receiver: string;
  contact: string;
}

export interface OrderSheet {
  items: Cart[] | number[];
  totalQuantity: number;
  totalPrice: number;
  mainBookTitle: string;
  paymentInformation: string;
  delivery: Delivery;
}

export interface Delivery {
  address: string;
  receiver: string;
  contact: string;
}

export interface OrderDetailItem {
  bookId: number;
  titlt: string;
  author: string;
  price: number;
  quantity: number;
}

export interface OrderListItem extends Order {
  detail?: OrderDetailItem[];
}

export interface FetchOrdersResponse {
  orders: OrderListItem[];
  pagination: Pagination;
}

export interface FetchOrders {
  maxResults?: number;
  page: number;
}
