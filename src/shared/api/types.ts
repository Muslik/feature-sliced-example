type OrderEntitiy = {
  vendorCode: string;
  name: string;
  price: number;
}

type Status = "new" | "calculation" | "confirmed" | "postponed" | "completed" | "declined"

export type Order = {
    id: string,
    customer: string,
    date: string,
    status: Status,
    amount: number,
    orderNumber:  string,
    sum: number,
    loyality: string,
  order: OrderEntitiy[]
}
