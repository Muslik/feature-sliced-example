import { combine, createEffect, createEvent, createStore } from "effector";
import { api, Order } from "src/shared/api";
import { parseInputToDate, parseDate } from "src/shared/lib";

import { Query, SortDirection, SortField, SortParams } from "./types";

export const fetchOrdersFx = createEffect(api.fetchOrders);

fetchOrdersFx.doneData.watch((f) => {
  console.log("fetchOrdersFx", f);
});

export const $orders = createStore<Order[]>([]);

$orders.on(fetchOrdersFx.doneData, (_, payload) => payload);

const $query = createStore<Query>({
  search: "",
  dateFrom: "",
  dateTo: "",
  statuses: [],
  priceFrom: "",
  priceTo: "",
});

export const $sortQuery = createStore<SortParams>({
  field: "date",
  direction: "desc",
});

export const sortQueryApplied = createEvent<SortParams>();

$sortQuery.on(sortQueryApplied, (_, payload) => payload);

export const setQuery = createEvent<Partial<Query>>();

$query.on(setQuery, (state, query) => ({ ...state, ...query }));

const isInRange = (min: number, max: number) => (value: number) => {
  const minValue = min || -Infinity;
  const maxValue = max || Infinity;
  return value >= minValue && value <= maxValue;
}

const areAllThruthy = (arr: boolean[]) => arr.every(Boolean);

const isIncludeString = (str: string, search: string) => {
  return str.toLowerCase().includes(search.toLowerCase());
};

const SORT_COMPARATORS: Record<SortField, (a: Order, b: Order, direction: SortDirection) => number> = {
  date: (a, b, direction) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return direction === "asc" ? dateA - dateB : dateB - dateA;
  },
  sum: (a, b, direction) => {
    const priceA = a.sum;
    const priceB = b.sum;
    return direction === "asc" ? priceA - priceB : priceB - priceA;
  },
  status: (a, b, direction) => {
    const statusA = a.status;
    const statusB = b.status;
    return direction === "asc" ? statusA.localeCompare(statusB) : statusB.localeCompare(statusA);
  },
  amount: (a, b, direction) => {
    const amountA = a.amount;
    const amountB = b.amount;
    return direction === "asc" ? amountA - amountB : amountB - amountA;
  }
}

export const $filteredOrders = combine($orders, $query, $sortQuery, (orders, query, sortQuery) => {
  const filtered = orders.filter((order) => {
    const searchFilter = isIncludeString(order.customer, query.search) || order.orderNumber.startsWith(query.search);
    const dateFilter = isInRange(parseInputToDate(query.dateFrom), parseInputToDate(query.dateTo));
    const priceFilter = isInRange(Number(query.priceFrom), Number(query.priceTo));
    const statusFilter = query.statuses.length ? query.statuses.includes(order.status) : true;

    return (
      areAllThruthy([
        searchFilter,
        dateFilter(parseDate(order.date)),
        priceFilter(order.sum),
        statusFilter,
      ])
    );
  });

  const sorted = filtered.sort((a, b) => {
    const comparator = SORT_COMPARATORS[sortQuery.field];
    return comparator(a, b, sortQuery.direction);
  })

  console.log("QUERY", query, filtered);
  return sorted;
});
