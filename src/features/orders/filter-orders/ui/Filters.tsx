import { useForm } from 'effector-forms';
import { STATUSES_MAP } from 'src/entities/orders';
import { useMobile } from 'src/shared/lib';
import { Button, Input, Select } from 'src/shared/ui';
import { filtersForm } from '../model';
import styles from './Filters.module.scss';

const STATUSES = Object.keys(STATUSES_MAP).map((status) => ({
  value: status,
  label: STATUSES_MAP[status],
}));

export const Filters = () => {
  const isMobile = useMobile();
  const { fields, submit, isDirty, reset } = useForm(filtersForm);

  const handleChangeStatuses = (status: string) => {
    const newStatuses = fields.statuses.value.includes(status)
      ? fields.statuses.value.filter((s) => s !== status)
      : [...fields.statuses.value, status];
    fields.statuses.onChange(newStatuses);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.formBlock}>
        <label className={styles.label} htmlFor="dateFrom">
          Дата оформления
        </label>
        <div className={styles.row}>
          <Input
            className={styles.dateInput}
            prefix="с"
            id="dateFrom"
            allowClear={true}
            value={fields.dateFrom.value}
            onChange={(e) => fields.dateFrom.onChange(e.target.value)}
            placeholder="dd.mm.yyyy"
          />
          <Input
            className={styles.dateInput}
            prefix="до"
            allowClear={true}
            value={fields.dateTo.value}
            onChange={(e) => fields.dateTo.onChange(e.target.value)}
            placeholder="dd.mm.yyyy"
          />
        </div>
      </div>
      <div className={styles.formBlock}>
        <label className={styles.label}>Статус заказа</label>
        <div className={styles.row}>
          <Select
            className={styles.select}
            name="status"
            options={STATUSES}
            selected={fields.statuses.value}
            onChange={handleChangeStatuses}
            multiple={true}
          />
        </div>
      </div>
      <div className={styles.formBlock}>
        <label className={styles.label} htmlFor="priceFrom">
          Сумма заказа
        </label>
        <div className={styles.row}>
          <Input
            className={styles.dateInput}
            prefix="от"
            id="priceFrom"
            allowClear={true}
            value={fields.priceFrom.value}
            onChange={(e) => fields.priceFrom.onChange(e.target.value)}
            placeholder="₽"
          />
          <Input
            className={styles.dateInput}
            prefix="до"
            allowClear={true}
            value={fields.priceTo.value}
            onChange={(e) => fields.priceTo.onChange(e.target.value)}
            placeholder="₽"
          />
        </div>
      </div>
      <div className={styles.formBlock}>
        <Button theme="blueReverse" onClick={() => submit()} withFullWidth={isMobile}>
          Применить
        </Button>
        {isMobile && isDirty && (
          <Button
            theme="blackReverse"
            className={styles.button}
            onClick={() => reset()}
            withFullWidth={isMobile}
          >
            Сбросить фильтры
          </Button>
        )}
      </div>
    </div>
  );
};
