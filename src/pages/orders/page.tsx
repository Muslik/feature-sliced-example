import { Searchbar } from "src/features/orders/filter-orders";
import { ThemeSwitcher } from "src/features/theme-switcher";
import { OrdersTable } from "src/widgets/orders/orders-table";

import styles from "./page.module.scss";

export const OrdersPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Список заказов</h1>
          <ThemeSwitcher />
        </div>
        <Searchbar className={styles.searchbar} />
        <OrdersTable />
      </div>
    </div>
  );
};
