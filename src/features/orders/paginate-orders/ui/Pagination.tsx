import { useUnit } from 'effector-react';
import { useForm } from 'effector-forms';
import cls from 'classnames';
import { $filteredOrders, $paginationQuery } from 'src/entities/orders';
import { Button, Dropdown, DropdownItem, Input } from 'src/shared/ui';

import { usePagination } from '../hooks';
import { pageSelected, pageForm } from '../model';

import styles from './Pagination.module.scss';

export const Pagination = () => {
  const { fields, isTouched, hasError, submit } = useForm(pageForm);
  const { orders, paginationQuery } = useUnit({
    orders: $filteredOrders,
    paginationQuery: $paginationQuery,
  });

  const paginationRange = usePagination({
    currentPage: paginationQuery.page,
    totalCount: orders.length,
    pageSize: paginationQuery.limit,
  });

  if (paginationRange.length === 0) {
    return null;
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit();
    }
  };

  return (
    <div className={styles.pages}>
      {paginationRange.map((page, index) => {
        if (typeof page === 'string') {
          return (
            <div className={cls(styles.pageItem, styles.dots)} key={page + index}>
              &#8230;
            </div>
          );
        }

        return (
          <Button
            key={page}
            size="small"
            className={styles.pageItem}
            theme={page === paginationQuery.page ? 'blue' : 'blueReverse'}
            onClick={() => pageSelected(page)}
          >
            {page}
          </Button>
        );
      })}
      <Dropdown
        className={styles.dropdown}
        position="top"
        trigger={
          <Button theme="blueReverse" size="small">
            #
          </Button>
        }
        overlay={
          <>
            <DropdownItem>Номер страницы</DropdownItem>
            <DropdownItem>
              <Input
                onKeyUp={handleKeyUp}
                placeholder="Номер страницы"
                value={fields.page.value}
                onChange={(e) => fields.page.onChange(e.target.value)}
                hasError={isTouched && hasError('page')}
              />
            </DropdownItem>
          </>
        }
      />
    </div>
  );
};
