export interface IProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  CategoryID: string;
  cardNumber:string;
  isPurchased: boolean;
  productInCart: number;
  purchaseDate: Date;
}
