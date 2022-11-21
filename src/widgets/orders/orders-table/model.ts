import { createEvent, createStore, sample } from 'effector';
import { ordersDeleted } from 'src/features/orders/delete-orders';

export const $selectedOrders = createStore<string[]>([]);

export const resetSelectedOrders = createEvent();

export const deleteConfirmed = createEvent();
export const orderSelected = createEvent<string>();

$selectedOrders
  .on(orderSelected, (state, payload) => {
    return state.includes(payload) ? state.filter((id) => id !== payload) : [...state, payload];
  })
  .reset(resetSelectedOrders);

sample({
  clock: deleteConfirmed,
  source: $selectedOrders,
  target: ordersDeleted,
});

sample({
  clock: ordersDeleted,
  target: resetSelectedOrders,
});
