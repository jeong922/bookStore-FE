import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../components/common/Title';
import { CartStyle } from './Cart';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Delivery, OrderSheet } from '../models/order.model';
import FindAddressButton from '../components/order/FindAddressButton';
import { order } from '../api/order.api';
import { useAlert } from '../hooks/useAlert';

type Info = {
  id: number;
  value: string;
};

const info: Info[] = [
  { id: 1, value: 'N Pay' },
  { id: 2, value: 'K Pay' },
  { id: 3, value: 'T Pay' },
  { id: 4, value: '신용카드' },
];

interface DeliveryForm extends Delivery {
  addressDetail: string;
}

export default function Order() {
  const { showAlert, showConfirm } = useAlert();
  const location = useLocation();
  const navigate = useNavigate();
  const orderDataFromCart = location.state;
  const { totalQuantity, totalPrice, mainBookTitle } = orderDataFromCart;
  const [payment, setPayment] = useState<null | string>(null);
  const [paymentError, setPaymentError] = useState(false);

  const handleSelectPayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setPayment(e.target.value);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DeliveryForm>();
  const handlePay = (data: DeliveryForm) => {
    if (payment === null) {
      setPaymentError(true);
      return;
    }

    const orderData: OrderSheet = {
      ...orderDataFromCart,
      items: [...orderDataFromCart.items],
      delivery: {
        contact: data.receiver,
        address: `${data.address} ${data.addressDetail}`,
        receiver: data.receiver,
      },
      paymentInformation: payment,
    };

    console.log(orderData);

    showConfirm('주문을 진행하시겠습니까?', () => {
      order(orderData).then(() => {
        showAlert('주문이 처리되었습니다.');
        navigate('/orderlist');
      });
    });

    setPaymentError(false);
  };

  return (
    <>
      <Title size='large'>주문서 작성</Title>
      <CartStyle>
        <div className='content'>
          <div className='order-info'>
            <Title size='medium' color='text'>
              배송 정보
            </Title>

            <form className='delivery'>
              <fieldset>
                <label>주소</label>
                <div className='input'>
                  <InputText
                    inputType='text'
                    {...register('address', { required: true })}
                  />
                </div>
                <FindAddressButton
                  onCompleted={(address) => {
                    setValue('address', address);
                  }}
                />
              </fieldset>
              {errors.address && (
                <p className='error-text'>주소를 입력해 주세요.</p>
              )}

              <fieldset>
                <label>상세 주소</label>
                <div className='input'>
                  <InputText
                    inputType='text'
                    {...register('addressDetail', { required: true })}
                  />
                </div>
              </fieldset>
              {errors.address && (
                <p className='error-text'>상세 주소를 입력해 주세요.</p>
              )}

              <fieldset>
                <label>수령인</label>
                <div className='input'>
                  <InputText
                    inputType='text'
                    {...register('receiver', { required: true })}
                  />
                </div>
              </fieldset>
              {errors.address && (
                <p className='error-text'>수령인을 입력해 주세요.</p>
              )}

              <fieldset>
                <label>전화번호</label>
                <div className='input'>
                  <InputText
                    inputType='text'
                    {...register('contact', { required: true })}
                  />
                </div>
              </fieldset>
              {errors.address && (
                <p className='error-text'>전화번호를 입력해 주세요.</p>
              )}
            </form>
          </div>

          <div className='order-info'>
            <Title size='medium' color='text'>
              주문 상품
            </Title>
            <strong>
              {mainBookTitle} 등 총 {totalQuantity}권
            </strong>
          </div>

          <OrderStyle>
            <div className='payment-info'>
              <Title size='medium' color='text'>
                결제수단
              </Title>
              <fieldset>
                <ul className='list'>
                  {info.map((item) => (
                    <PaymentOption
                      key={item.id}
                      item={item}
                      selectedPayment={payment}
                      onChange={handleSelectPayment}
                    />
                  ))}
                </ul>
              </fieldset>
              {paymentError && (
                <p className='error-text'>결제수단을 선택해 주세요.</p>
              )}
            </div>
          </OrderStyle>
        </div>

        <div className='summary'>
          <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
          <Button
            size='large'
            scheme='primary'
            onClick={handleSubmit(handlePay)}
          >
            결제하기
          </Button>
        </div>
      </CartStyle>
    </>
  );
}

interface PaymentOptionProps {
  item: Info;
  selectedPayment: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentOption = ({
  item,
  selectedPayment,
  onChange,
}: PaymentOptionProps) => {
  return (
    <StyledPaymentItem $isSelected={selectedPayment === item.value}>
      <label htmlFor={item.value}>{item.value}</label>
      <input
        type='radio'
        id={item.value}
        value={item.value}
        checked={selectedPayment === item.value}
        onChange={onChange}
        required
      />
    </StyledPaymentItem>
  );
};

const StyledPaymentItem = styled.li<{ $isSelected: boolean }>`
  text-align: center;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  background-color: ${({ theme, $isSelected }) =>
    $isSelected
      ? theme.buttonScheme.primary.backgroundColor
      : theme.buttonScheme.normal.backgroundColor};
  padding: 4px 8px;

  input {
    display: none;
  }

  label {
    color: ${({ theme, $isSelected }) =>
      $isSelected
        ? theme.buttonScheme.primary.color
        : theme.buttonScheme.normal.color};
    padding: 4px 8px;
    cursor: pointer;
  }
`;

const OrderStyle = styled.div`
  .payment-info {
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;

    fieldset {
      border: 0;
      margin: 0;
      padding: 0 0 12px 0;
      display: flex;
      justify-content: start;
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      list-style: none;
      padding: 0;
    }
  }
`;
