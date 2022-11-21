import { createEvent, createStore, sample } from 'effector';
import { applyStatusChange } from 'src/features/orders/batch-status-update';
import { ordersDeleted } from 'src/features/orders/delete-orders';

export const $selectedOrders = createStore<string[]>([]);

export const resetSelectedOrders = createEvent();

export const statusChanged = createEvent<string>();
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
  clock: [applyStatusChange, ordersDeleted],
  target: resetSelectedOrders,
});

sample({
  clock: statusChanged,
  source: $selectedOrders,
  fn: (orders, status) => orders.map((id) => ({ id, status })),
  target: applyStatusChange,
});
