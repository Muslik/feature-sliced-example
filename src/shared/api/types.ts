type OrderEntitiy = {
  vendorCode: string;
  name: string;
  price: number;
}

export type Order = {
    id: string,
    customer: string,
    date: string,
    status: string,
    amount: number,
    orderNumber:  string,
    sum: number,
    loyality: string,
  order: OrderEntitiy[]
}
