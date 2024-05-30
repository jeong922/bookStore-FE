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
