import { createEvent, sample } from 'effector';
import { ordersChanged } from 'src/entities/orders';

export const applyStatusChange = createEvent<{ id: string; status: string }[]>();

sample({
  clock: applyStatusChange,
  target: ordersChanged,
});
