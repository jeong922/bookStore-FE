import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

export default function Order() {
  const location = useLocation();
  const orderDataFromCart = location.state;

  console.log(orderDataFromCart);

  return <OrderStyle>order</OrderStyle>;
}

const OrderStyle = styled.div``;
