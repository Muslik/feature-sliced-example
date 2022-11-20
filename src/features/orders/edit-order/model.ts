import { createForm } from "effector-forms";
import { combine, createEvent, createStore, sample } from "effector";
import { $orders, orderChanged } from "src/entities/orders";

const VALID_CONFIRMATION_CODE = "123";

export const $editingOrderId = createStore<string | null>(null);

export const orderEdited = createEvent<string>();
export const orderEditFinished = createEvent();

$editingOrderId.on(orderEdited, (_, id) => id).reset(orderEditFinished);

export const $orderEdit = combine($orders, $editingOrderId, (orders, id) => {
  if (!id) return null;
  return orders.find((order) => order.id === id);
});

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
  source: $orderEdit,
  filter: Boolean,
  fn: (order) => ({
    id: order.id,
    date: order.date,
    customer: order.customer,
    loyality: order.loyality,
    status: order.status,
  }),
  target: orderForm.setForm,
});

sample({
  clock: orderForm.formValidated,
  fn: ({ confirmationCode, ...rest }) => rest,
  target: [orderChanged, orderEditFinished],
});
