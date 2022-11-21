import { combine, createEffect, createEvent, createStore } from 'effector';
import { api, Order } from 'src/shared/api';
import { parseInputToDate, parseDate } from 'src/shared/lib';
import { SORT_COMPARATORS } from './lib';

import { PaginationParams, Query, SortParams } from './types';

export const fetchOrdersFx = createEffect(api.fetchOrders);

export const $orders = createStore<Order[]>([]);

export const orderChanged = createEvent<Partial<Order>>();

export const deleteOrders = createEvent<string[]>();

$orders
  .on(fetchOrdersFx.doneData, (_, payload) => payload)
  .on(deleteOrders, (state, payload) => {
    return state.filter((order) => !payload.includes(order.id));
  })
  .on(orderChanged, (state, payload) => {
    return state.map((order) => {
      if (order.id === payload.id) {
        return { ...order, ...payload };
      }
      return order;
    });
  });

const $filtersQuery = createStore<Query>({
  search: '',
  dateFrom: '',
  dateTo: '',
  statuses: [],
  priceFrom: '',
  priceTo: '',
});

export const $sortQuery = createStore<SortParams>({
  field: 'date',
  direction: 'desc',
});

export const $paginationQuery = createStore<PaginationParams>({
  page: 1,
  limit: 50,
});

export const setPaginationQuery = createEvent<Partial<PaginationParams>>();

$paginationQuery.on(setPaginationQuery, (state, payload) => ({
  ...state,
  ...payload,
}));

export const sortQueryApplied = createEvent<SortParams>();

$sortQuery.on(sortQueryApplied, (_, payload) => payload);

export const setFiltersQuery = createEvent<Partial<Query>>();

$filtersQuery.on(setFiltersQuery, (state, query) => ({ ...state, ...query }));

const isInRange = (min: number, max: number) => (value: number) => {
  const minValue = min || -Infinity;
  const maxValue = max || Infinity;
  return value >= minValue && value <= maxValue;
};

const areAllThruthy = (arr: boolean[]) => arr.every(Boolean);

const isIncludeString = (str: string, search: string) => {
  return str.toLowerCase().includes(search.toLowerCase());
};

export const $filteredOrders = combine(
  $orders,
  $filtersQuery,
  $sortQuery,
  (orders, query, sortQuery) => {
    const filtered = orders.filter((order) => {
      const searchFilter =
        isIncludeString(order.customer, query.search) || order.orderNumber.startsWith(query.search);
      const dateFilter = isInRange(
        parseInputToDate(query.dateFrom),
        parseInputToDate(query.dateTo),
      );
      const priceFilter = isInRange(Number(query.priceFrom), Number(query.priceTo));
      const statusFilter = query.statuses.length ? query.statuses.includes(order.status) : true;

      return areAllThruthy([
        searchFilter,
        dateFilter(parseDate(order.date)),
        priceFilter(order.sum),
        statusFilter,
      ]);
    });

    const sorted = filtered.sort((a, b) => {
      const comparator = SORT_COMPARATORS[sortQuery.field];
      return comparator(a, b, sortQuery.direction);
    });

    return sorted;
  },
);

export const $paginatedOrders = combine(
  $filteredOrders,
  $paginationQuery,
  (orders, paginationQuery) => {
    const firstPageIndex = (paginationQuery.page - 1) * paginationQuery.limit;
    const lastPageIndex = firstPageIndex + paginationQuery.limit;

    return orders.slice(firstPageIndex, lastPageIndex);
  },
);
