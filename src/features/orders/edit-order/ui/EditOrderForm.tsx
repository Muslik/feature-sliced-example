import { useUnit } from "effector-react";
import { useForm } from "effector-forms";
import { Button, Input, Modal, Select } from "src/shared/ui";
import { LOYALITY_MAP, STATUSES_MAP } from "src/entities/orders";
import { $editingOrderId, $orderEdit, orderForm } from "../model";

import styles from "./EditOrderForm.module.scss";

const STATUSES = Object.keys(STATUSES_MAP).map((status) => ({
  value: status,
  label: STATUSES_MAP[status],
}));

export const EditOrderForm = () => {
  const { fields, submit, hasError, errorText, isValid } =
    useForm(orderForm);

  const firstError =
    errorText("customer") ||
    errorText("status") ||
    errorText("loyality") ||
    errorText("confirmationCode");

  const model = useUnit({
    editId: $editingOrderId,
    orderEdit: $orderEdit,
  });

  return (
    <Modal isOpen={!!model.editId}>
      <div className={styles.content}>
        <div className={styles.header}>
          Заявка #{model.orderEdit?.orderNumber}
        </div>
        <div className={styles.body}>
          <div className={styles.row}>
            <label>
              <div className={styles.labelText}>Дата и время заказа</div>
              <Input
                className={styles.input}
                value={fields.date.value}
                onChange={(e) => fields.date.onChange(e.target.value)}
                disabled={true}
              />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              <div className={styles.labelText}>ФИО покупателя</div>
              <Input
                className={styles.input}
                value={fields.customer.value}
                onChange={(e) => fields.customer.onChange(e.target.value)}
                hasError={hasError("customer")}
              />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              <div className={styles.labelText}>Уровень лояльности</div>
              <Input
                className={styles.input}
                value={LOYALITY_MAP[fields.loyality.value]}
                onChange={(e) => fields.loyality.onChange(e.target.value)}
                disabled={true}
              />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              <div className={styles.labelText}>Статус заказа</div>
              <Select
                className={styles.input}
                name="status"
                options={STATUSES}
                selected={fields.status.value}
                onChange={(status) => fields.status.onChange(status)}
              />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              <div className={styles.labelText}>Код подтверждения</div>
              <Input
                className={styles.input}
                value={fields.confirmationCode.value}
                onChange={(e) =>
                  fields.confirmationCode.onChange(e.target.value)
                }
                hasError={hasError("confirmationCode")}
                allowClear={true}
              />
            </label>
          </div>
        </div>
        <div className={styles.footer}>
          {!isValid && <div className={styles.error}>{firstError}</div>}
          <Button
            theme="blue"
            onClick={() => submit()}
            className={styles.submitButton}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </Modal>
  );
};
