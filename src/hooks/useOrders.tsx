import { useEffect, useState } from 'react';
import { OrderListItem } from '../models/order.model';
import { fetchOrder, fetchOrders } from '../api/order.api';
import { LIMIT } from '../constants/pagination';
import { QUERYSTRING } from '../constants/querystring';
import { useLocation } from 'react-router-dom';
import { Pagination } from '../models/pagination.model';

export const useOrders = () => {
  const location = useLocation();
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    totalCount: 0,
    currentPage: 1,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    fetchOrders({
      page: params.get(QUERYSTRING.PAGE)
        ? Number(params.get(QUERYSTRING.PAGE))
        : 1,
      maxResults: LIMIT,
    }).then(({ orders, pagination }) => {
      setOrders(orders);
      setPagination(pagination);
    });
  }, [location.search]);

  const selectOrderItem = (orderId: number) => {
    // 요청 방어
    const orderItem = orders.find((item) => item.id === orderId);
    if (orderItem && orderItem.detail) {
      setSelectedItemId(orderId);
      return;
    }

    fetchOrder(orderId).then((orderDetail) => {
      setSelectedItemId(orderId);
      const data = orders.map((item) => {
        if (item.id === orderId) {
          return {
            ...item,
            detail: orderDetail,
          };
        }
        return item;
      });

      console.log('data', data);
      // setOrders(data);
    });
  };

  return { orders, pagination, selectedItemId, selectOrderItem };
};
