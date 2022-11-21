import { useUnit } from 'effector-react';
import cls from 'classnames';
import { useForm } from 'effector-forms';
import {
  Button,
  Dropdown,
  DropdownItem,
  Input,
  Modal,
  Select,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from 'src/shared/ui';
import { formatMoney } from 'src/shared/lib';
import { LOYALITY_MAP, STATUSES_MAP } from 'src/entities/orders';
import { $hasUnsavedChanges, $orderToEdit, orderForm } from '../model';

import styles from './EditOrderForm.module.scss';

const STATUSES = Object.keys(STATUSES_MAP).map((status) => ({
  value: status,
  label: STATUSES_MAP[status],
}));

export const EditOrderForm = () => {
  const { fields, submit, hasError, errorText, isValid, reset } = useForm(orderForm);
  const model = useUnit({
    orderToEdit: $orderToEdit,
    hasUnsavedChanges: $hasUnsavedChanges,
  });

  if (!model.orderToEdit) {
    return null;
  }
  const firstError =
    errorText('customer') ||
    errorText('status') ||
    errorText('loyality') ||
    errorText('confirmationCode');

  const hasUnsavedChangedClose = () => {
    if (model.hasUnsavedChanges) {
      return (
        <Dropdown
          trigger={<Button icon="xlarge" />}
          className={styles.dropdown}
          overlay={
            <>
              <DropdownItem>Есть несохраненные изменения</DropdownItem>
              <DropdownItem>
                <Button
                  withFullWidth={true}
                  theme="blueReverse"
                  onClick={() => reset()}
                  size="small"
                >
                  Сбросить
                </Button>
              </DropdownItem>
              <DropdownItem>
                <Button withFullWidth={true} theme="blue" size="small">
                  Остаться
                </Button>
              </DropdownItem>
            </>
          }
        />
      );
    }

    return <Button icon="xlarge" onClick={() => reset()} />;
  };

  return (
    <Modal isOpen={true}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>Заявка #{model.orderToEdit.orderNumber}</div>
          {hasUnsavedChangedClose()}
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
                hasError={hasError('customer')}
              />
            </label>
          </div>
          <div className={styles.row}>
            <Table>
              <TableHeader>
                <TableCell className={cls(styles.cell, styles.vendorCodeCell)}>Артикул</TableCell>
                <TableCell className={cls(styles.cell, styles.nameCell)}>Название</TableCell>
                <TableCell className={cls(styles.cell, styles.priceCell)}>Цена</TableCell>
              </TableHeader>
              <TableBody>
                {model.orderToEdit.order.map((item) => (
                  <TableRow key={item.vendorCode}>
                    <TableCell className={cls(styles.cell, styles.vendorCodeCell)}>
                      {item.vendorCode}
                    </TableCell>
                    <TableCell className={cls(styles.cell, styles.nameCell)}>{item.name}</TableCell>
                    <TableCell className={cls(styles.cell, styles.priceCell)}>
                      {formatMoney(item.price)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <div className={styles.totalAmount}>
                  Итоговая сумма: {formatMoney(model.orderToEdit.sum)}
                </div>
              </TableFooter>
            </Table>
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
                onChange={(e) => fields.confirmationCode.onChange(e.target.value)}
                hasError={hasError('confirmationCode')}
                allowClear={true}
              />
            </label>
          </div>
        </div>
        <div className={styles.footer}>
          {!isValid && <div className={styles.error}>{firstError}</div>}
          <Button theme="blue" onClick={() => submit()}>
            Сохранить
          </Button>
        </div>
      </div>
    </Modal>
  );
};
