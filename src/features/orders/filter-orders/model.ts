import { debounce } from "patronum";
import { combine, createEvent, createStore, sample } from "effector";
import { setQuery } from "src/entities/orders";

const DEBOUNCE_TIME = 300;

export const $search = createStore("");

export const searchChanged = createEvent<string>();

$search.on(searchChanged, (_, search) => search);

const debouncedSearchChanged = debounce({
  source: searchChanged,
  timeout: DEBOUNCE_TIME,
});

sample({
  source: debouncedSearchChanged,
  fn: (search) => ({ search }),
  target: setQuery,
});

export const resetFilters = createEvent();

export const $isFiltersVisible = createStore(false).reset(resetFilters);

export const toggleFilters = createEvent();

$isFiltersVisible.on(toggleFilters, (isFiltersVisible) => !isFiltersVisible);

// Форма

export const $dateFrom = createStore("").reset(resetFilters);

export const dateFromChanged = createEvent<string>();

$dateFrom.on(dateFromChanged, (_, dateFrom) => dateFrom);

export const $dateTo = createStore("").reset(resetFilters);

export const dateToChanged = createEvent<string>();

$dateTo.on(dateToChanged, (_, dateFrom) => dateFrom);

export const $statuses = createStore<string[]>([]).reset(resetFilters);

export const statusesChanged = createEvent<string>();

$statuses.on(statusesChanged, (state, status) =>
  state.includes(status)
    ? state.filter((s) => s !== status)
    : [...state, status]
);

export const $priceFrom = createStore("").reset(resetFilters);

export const priceFromChanged = createEvent<string>();

$priceFrom.on(priceFromChanged, (_, priceFrom) => priceFrom);

export const $priceTo = createStore("").reset(resetFilters);

export const priceToChanged = createEvent<string>();

$priceTo.on(priceToChanged, (_, priceTo) => priceTo);

const $form = combine({
  dateFrom: $dateFrom,
  dateTo: $dateTo,
  statuses: $statuses,
  priceFrom: $priceFrom,
  priceTo: $priceTo
})

export const filtersApplied = createEvent();

sample({
  source: $form,
  clock: [resetFilters, filtersApplied],
  fn: (form) => form,
  target: setQuery,
})

export const $isFiltersFilled = $form.map((form) => {
  return Object.values(form).some((value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== "";
  });
})
