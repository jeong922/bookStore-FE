import { FetchOrders } from './../models/order.model';
import { OrderSheet } from '../models/order.model';
import { requestHandler } from './http';

export const order = async (orderData: OrderSheet) => {
  return await requestHandler('post', '/orders', orderData);
};

export const fetchOrders = async (params: FetchOrders) => {
  return await requestHandler('get', '/orders', params);
};

export const fetchOrder = async (orderId: number) => {
  return await requestHandler('get', `/orders/${orderId}`);
};
