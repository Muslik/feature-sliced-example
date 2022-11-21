import { createForm } from 'effector-forms';
import { debounce } from 'patronum';
import { createEvent, createStore, sample } from 'effector';
import { setFiltersQuery } from 'src/entities/orders';

const DEBOUNCE_TIME = 300;

export const $search = createStore('');

export const searchChanged = createEvent<string>();

$search.on(searchChanged, (_, search) => search);

const debouncedSearchChanged = debounce({
  source: searchChanged,
  timeout: DEBOUNCE_TIME,
});

sample({
  source: debouncedSearchChanged,
  fn: (search) => ({ search }),
  target: setFiltersQuery,
});

export const filtersForm = createForm({
  fields: {
    dateFrom: {
      init: '',
    },
    dateTo: {
      init: '',
    },
    statuses: {
      init: [] as string[],
    },
    priceFrom: {
      init: '',
    },
    priceTo: {
      init: '',
    },
  },
});

sample({
  source: filtersForm.$values,
  clock: [filtersForm.reset, filtersForm.submit],
  target: setFiltersQuery,
});

export const $isFiltersVisible = createStore(false).reset(filtersForm.reset);

export const toggleFilters = createEvent();

$isFiltersVisible.on(toggleFilters, (isFiltersVisible) => !isFiltersVisible);
