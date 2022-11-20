import { orders } from "./mocks"
import { Order } from "./types";

export const fetchOrders = async (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(orders), 2000);
  })
}
