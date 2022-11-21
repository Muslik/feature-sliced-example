import { createEvent, sample } from 'effector';
import { deleteOrders } from 'src/entities/orders';

export const ordersDeleted = createEvent<string[]>();

sample({
  clock: ordersDeleted,
  target: deleteOrders,
});
