export type Query = {
  search: string;
  dateFrom: string;
  dateTo: string;
  statuses: string[];
  priceFrom: string;
  priceTo: string;
};

export type SortField = "date" | "status" | "amount" | "sum"

export type SortDirection = "asc" | "desc"

export type SortParams = {
  field: SortField;
  direction: SortDirection;
}
