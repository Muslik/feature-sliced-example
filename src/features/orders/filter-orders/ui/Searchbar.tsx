import { useUnit } from 'effector-react';
import { useForm } from 'effector-forms';
import cls from 'classnames';
import { Button, Icon, Input } from 'src/shared/ui';
import { fetchOrdersFx } from 'src/entities/orders';
import { Filters } from './Filters';
import { $isFiltersVisible, $search, searchChanged, toggleFilters, filtersForm } from '../model';
import styles from './Searchbar.module.scss';

type Props = { className?: string };

export const Searchbar = ({ className }: Props) => {
  const [search, searchChangedFn, isFiltersVisible, toggleFiltersFn, isOrdersLoading] = useUnit([
    $search,
    searchChanged,
    $isFiltersVisible,
    toggleFilters,
    fetchOrdersFx.pending,
  ]);

  const { isDirty, reset } = useForm(filtersForm);

  return (
    <div className={cls(styles.searchbar, className)}>
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
          theme={isFiltersVisible ? 'blue' : 'blueReverse'}
          className={styles.button}
          onClick={() => toggleFiltersFn()}
        >
          Фильтры
        </Button>
        {isDirty && (
          <Button theme="blueReverse" className={styles.button} onClick={() => reset()}>
            Сбросить фильтры
          </Button>
        )}

        {isOrdersLoading && (
          <div className={styles.loading}>
            <Icon name="refresh" className={cls(styles.loadingIcon)} stroke="var(--blue)" />
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
