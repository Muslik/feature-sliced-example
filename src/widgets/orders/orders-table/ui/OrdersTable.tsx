import { useUnit } from "effector-react";
import {
  $paginatedOrders,
  $sortQuery,
  OrderStatus,
  SortField,
} from "src/entities/orders";
import { orderEdited } from "src/features/orders/edit-order";
import { sortApplied } from "src/features/orders/sort-orders";
import { Pagination } from "src/features/orders/paginate-orders";
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
  const model = useUnit({
    orders: $paginatedOrders,
    sortQuery: $sortQuery,
  });

  const handleSort = (field: SortField) => {
    const direction =
      model.sortQuery.field === field
        ? INVERTED_SORT_DIRECTION[model.sortQuery.direction]
        : "desc";
    sortApplied({ field, direction });
  };

  return (
    <Table>
      <TableHeader>
        <TableHeaderCell className={styles.cellOrderNumber}>#</TableHeaderCell>
        <TableHeaderCell
          isActive={model.sortQuery.field === "date"}
          direction={
            model.sortQuery.field === "date"
              ? model.sortQuery.direction
              : "desc"
          }
          onSort={() => handleSort("date")}
          className={styles.cellDate}
        >
          Дата
        </TableHeaderCell>
        <TableHeaderCell
          isActive={model.sortQuery.field === "status"}
          direction={
            model.sortQuery.field === "status"
              ? model.sortQuery.direction
              : "desc"
          }
          onSort={() => handleSort("status")}
          className={styles.cellStatus}
        >
          Статус
        </TableHeaderCell>
        <TableHeaderCell
          isActive={model.sortQuery.field === "amount"}
          direction={
            model.sortQuery.field === "amount"
              ? model.sortQuery.direction
              : "desc"
          }
          onSort={() => handleSort("amount")}
          className={styles.cellAmount}
        >
          Позиций
        </TableHeaderCell>
        <TableHeaderCell
          isActive={model.sortQuery.field === "sum"}
          direction={
            model.sortQuery.field === "sum" ? model.sortQuery.direction : "desc"
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
            <TableRow key={id} onClick={() => orderEdited(id)}>
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
      <TableFooter className={styles.footer}>
        <Button size="small" theme="danger">Delete</Button>
        <Pagination />
      </TableFooter>
    </Table>
  );
};
