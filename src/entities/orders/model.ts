import { combine, createEffect, createEvent, createStore } from "effector";
import { api, Order } from "src/shared/api";

import { Query } from "./types";

export const fetchOrdersFx = createEffect(api.fetchOrders);

fetchOrdersFx.doneData.watch((f) => {
  console.log("fetchOrdersFx", f);
});

export const $orders = createStore<Order[]>([]);

$orders.on(fetchOrdersFx.doneData, (_, payload) => payload);

const $query = createStore<Query>({ search: "" });

export const setQuery = createEvent<Partial<Query>>();

$query.on(setQuery, (state, query) => ({ ...state, ...query }));

const isIncludeString = (str: string, search: string) => {
  return str.toLowerCase().includes(search.toLowerCase());
};

export const $filteredOrders = combine($orders, $query, (orders, query) => {
  const filtered = orders.filter((order) => {
    return (
      isIncludeString(order.customer, query.search) ||
      order.orderNumber.startsWith(query.search)
    );
  });
  console.log("QUERY", query, filtered);
  return filtered;
});

