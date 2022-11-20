import { createForm } from "effector-forms";
import { combine, createEvent, sample } from "effector";
import { $orders, orderChanged } from "src/entities/orders";
import { Order } from "src/shared/api";

const VALID_CONFIRMATION_CODE = "123";

export const orderEdited = createEvent<string>();

export const orderForm = createForm({
  validateOn: ["submit"],
  fields: {
    id: {
      init: "",
    },
    date: {
      init: "",
    },
    customer: {
      init: "",
      rules: [
        {
          name: "required",
          validator: (value) => ({
            isValid: Boolean(value),
            errorText: "Необходимо указать имя клиента",
          }),
        },
      ],
    },
    loyality: {
      init: "",
    },
    status: {
      init: "",
    },
    confirmationCode: {
      init: "",
      rules: [
        {
          name: "required",
          validator: (value) => ({
            isValid: Boolean(value),
            errorText: "Необходимо указать код подтверждения",
          }),
        },
        {
          name: "invalidCode",
          validator: (value) => ({
            isValid: value === VALID_CONFIRMATION_CODE,
            errorText: "Неверный код подтверждения",
          }),
        },
      ],
    },
  },
});

sample({
  clock: orderEdited,
  fn: (id) => ({ id }),
  target: orderForm.setForm,
});

export const $orderToEdit = combine(
  $orders,
  orderForm.$values,
  (orders, { id }) => {
    if (!id) {
      return null;
    }
    return orders.find((order) => order.id === id) ?? null;
  }
);

sample({
  source: $orderToEdit,
  filter: Boolean,
  fn: (orderToEdit) => ({
    id: orderToEdit?.id,
    date: orderToEdit?.date,
    customer: orderToEdit?.customer,
    loyality: orderToEdit?.loyality,
    status: orderToEdit?.status,
  }),
  target: orderForm.setForm,
});

sample({
  clock: orderForm.formValidated,
  fn: ({ confirmationCode, ...rest }) => rest,
  target: orderChanged,
});

sample({
  clock: orderChanged,
  target: orderForm.reset,
});

export const $hasUnsavedChanges = combine(
  $orderToEdit,
  orderForm.$values,
  (orderToEdit, { confirmationCode, ...values }) => {
    if (!orderToEdit) {
      return false;
    }

    return Object.keys(values).some(
      (key) =>
        orderToEdit[key as keyof Order] !==
        values[
          key as Exclude<keyof typeof orderForm.fields, "confirmationCode">
        ]
    );
  }
);
