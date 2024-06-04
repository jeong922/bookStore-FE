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
  items: number[];
  totalQuantity: number;
  totalPrice: number;
  mainBookTitle: string;
  paymentInformation: string;
  delivery: {
    adress: string;
    receiver: string;
    contact: string;
  };
}
