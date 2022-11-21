import { combine, createEvent, createStore, sample } from 'effector';
import { condition } from 'patronum';
import { $paginatedOrders } from 'src/entities/orders';
import { applyStatusChange } from 'src/features/orders/batch-status-update';
import { ordersDeleted } from 'src/features/orders/delete-orders';
import { Order } from 'src/shared/api';

export const $selectedOrders = createStore<string[]>([]);

export const resetSelectedOrders = createEvent();

export const statusChanged = createEvent<string>();
export const deleteConfirmed = createEvent();
export const orderSelected = createEvent<string>();
export const ordersSelected = createEvent<string[]>();

$selectedOrders
  .on(ordersSelected, (_, payload) => payload)
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

export const selectAllOrders = createEvent();

export const $areAllOrdersSelected = combine(
  $paginatedOrders,
  $selectedOrders,
  (orders, selected) => {
    return orders.length === selected.length;
  },
);

condition({
  source: sample({
    source: [$paginatedOrders, $selectedOrders],
    clock: selectAllOrders,
    fn: ([orders, selected]) => ({ orders, selected }),
  }),
  if: $areAllOrdersSelected,
  then: ordersSelected.prepend(() => []),
  else: ordersSelected.prepend(({ orders }: { selected: string[]; orders: Order[] }) =>
    orders.map((order) => order.id),
  ),
});
