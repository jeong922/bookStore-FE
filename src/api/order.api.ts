import {
  FetchOrders,
  FetchOrdersResponse,
  OrderDetailItem,
} from './../models/order.model';
import { OrderSheet } from '../models/order.model';
import { httpClient } from './http';

export const order = async (orderData: OrderSheet) => {
  console.log(orderData);
  const response = await httpClient.post('/orders', orderData);

  return response.data;
};

export const fetchOrders = async (params: FetchOrders) => {
  const response = await httpClient.get<FetchOrdersResponse>('/orders', {
    params: params,
  });

  return response.data;
};

export const fetchOrder = async (orderId: number) => {
  const response = await httpClient.get<OrderDetailItem>(`/orders/${orderId}`);

  return response.data;
};
