import { Order } from "src/shared/api";
import { parseDate } from "src/shared/lib";
import { SortField, SortDirection } from "../types";

export const SORT_COMPARATORS: Record<
  SortField,
  (a: Order, b: Order, direction: SortDirection) => number
> = {
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
    return direction === "asc"
      ? statusA.localeCompare(statusB)
      : statusB.localeCompare(statusA);
  },
  amount: (a, b, direction) => {
    const amountA = a.amount;
    const amountB = b.amount;
    return direction === "asc" ? amountA - amountB : amountB - amountA;
  },
};
