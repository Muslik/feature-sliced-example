import { useUnit } from "effector-react";
import {
  $filteredOrders,
  $sortParams,
  OrderStatus,
  SortField,
} from "src/entities/orders";
import { sortApplied } from "src/features/orders/sort-orders";
import { formatDate, formatMoney } from "src/shared/lib";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "src/shared/ui";

import styles from "./OrdersTable.module.scss";

type Props = {};

const INVERTED_SORT_DIRECTION = {
  asc: "desc",
  desc: "asc",
} as const;

export const OrdersTable = ({ }: Props) => {
  const model = useUnit({ orders: $filteredOrders, sortParams: $sortParams });

  const handleSort = (field: SortField) => {
    const direction =
      model.sortParams.field === field
        ? INVERTED_SORT_DIRECTION[model.sortParams.direction]
        : "desc";
    sortApplied({ field, direction });
  };

  return (
    <Table>
      <TableHeader>
        <TableHeaderCell className={styles.cellOrderNumber}>#</TableHeaderCell>
        <TableHeaderCell
          isActive={model.sortParams.field === "date"}
          direction={
            model.sortParams.field === "date"
              ? model.sortParams.direction
              : "desc"
          }
          onSort={() => handleSort("date")}
          className={styles.cellDate}
        >
          Дата
        </TableHeaderCell>
        <TableHeaderCell
          isActive={model.sortParams.field === "status"}
          direction={
            model.sortParams.field === "status"
              ? model.sortParams.direction
              : "desc"
          }
          onSort={() => handleSort("status")}
          className={styles.cellStatus}
        >
          Статус
        </TableHeaderCell>
        <TableHeaderCell
          isActive={model.sortParams.field === "amount"}
          direction={
            model.sortParams.field === "amount"
              ? model.sortParams.direction
              : "desc"
          }
          onSort={() => handleSort("amount")}
          className={styles.cellAmount}
        >
          Позиций
        </TableHeaderCell>
        <TableHeaderCell
          isActive={model.sortParams.field === "sum"}
          direction={
            model.sortParams.field === "sum"
              ? model.sortParams.direction
              : "desc"
          }
          onSort={() => handleSort("sum")}
          className={styles.cellSum}
        >
          Сумма
        </TableHeaderCell>
        <TableHeaderCell className={styles.cellCustomer}>
          ФИО покупателя
        </TableHeaderCell>
      </TableHeader>
      <TableBody>
        {model.orders.map(
          ({ id, orderNumber, date, status, amount, sum, customer }) => (
            <TableRow key={id}>
              <TableCell className={styles.cellOrderNumber}>
                {orderNumber}
              </TableCell>
              <TableCell className={styles.cellDate}>
                {formatDate(date)}
              </TableCell>
              <TableCell className={styles.cellStatus}>
                <OrderStatus status={status} />
              </TableCell>
              <TableCell className={styles.cellAmount}>{amount}</TableCell>
              <TableCell className={styles.cellSum}>
                {formatMoney(sum)}
              </TableCell>
              <TableCell className={styles.cellCustomer}>{customer}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
      <TableFooter>
        <Button theme="danger">Delete</Button>
      </TableFooter>
    </Table>
  );
};
