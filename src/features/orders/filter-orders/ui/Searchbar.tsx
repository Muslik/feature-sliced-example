import { useUnit } from "effector-react";
import cls from "classnames";
import { Button, Icon, Input } from "src/shared/ui";
import { $orders, fetchOrdersFx } from "src/entities/orders/model";
import { Filters } from "./Filters";
import {
  $isFiltersFilled,
  $isFiltersVisible,
  $search,
  resetFilters,
  searchChanged,
  toggleFilters,
} from "../model";
import styles from "./Searchbar.module.scss";

type Props = {};

export const Searchbar = ({ }: Props) => {
  const [
    search,
    searchChangedFn,
    isFiltersVisible,
    toggleFiltersFn,
    isFiltersFilled,
    isOrdersLoading,
  ] = useUnit([
    $search,
    searchChanged,
    $isFiltersVisible,
    toggleFilters,
    $isFiltersFilled,
    fetchOrdersFx.pending,
  ]);

  return (
    <div className={styles.searchbar}>
      <div className={styles.searchRow}>
        <Input
          value={search}
          onChange={({ target: { value } }) => searchChangedFn(value)}
          className={styles.search}
          prefix={<Icon stroke="var(--blue)" name="search" />}
          placeholder="Номер заказа или ФИО"
          allowClear={true}
        />
        <Button
          theme={isFiltersVisible ? "blue" : "blueReverse"}
          className={styles.button}
          onClick={() => toggleFiltersFn()}
        >
          Фильтры
        </Button>
        {isFiltersFilled && (
          <Button
            theme="blueReverse"
            className={styles.button}
            onClick={() => resetFilters()}
          >
            Сбросить фильтры
          </Button>
        )}

        {isOrdersLoading && (
          <div className={styles.loading}>
            <Icon
              name="refresh"
              className={cls(styles.loadingIcon)}
              stroke="var(--blue)"
            />
            Загрузка
          </div>
        )}
      </div>
      {isFiltersVisible && (
        <div className={styles.filtersRow}>
          <Filters />
        </div>
      )}
    </div>
  );
};
