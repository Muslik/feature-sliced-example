import { createEvent, sample } from 'effector';
import { createForm } from 'effector-forms';
import { $filteredOrders, setPaginationQuery } from 'src/entities/orders';

export const pageForm = createForm({
  validateOn: ['submit'],
  fields: {
    page: {
      init: '',
      rules: [
        {
          name: 'invalidPage',
          source: $filteredOrders,
          validator: (value, _, orders) => {
            const pageTo = Number(value);
            return pageTo > 0 && pageTo <= orders.length;
          },
        },
      ],
    },
  },
});

sample({
  clock: pageForm.formValidated,
  fn: ({ page }) => ({ page: Number(page) }),
  target: setPaginationQuery,
});

export const pageSelected = createEvent<number>();

sample({
  source: pageSelected,
  fn: (page) => ({ page }),
  target: setPaginationQuery,
});
