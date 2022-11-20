import { useUnit } from "effector-react";
import { useState } from "react";
import { Button, Input, Select } from "src/shared/ui";
import {
  $dateFrom,
  $dateTo,
  $priceFrom,
  $priceTo,
  $statuses,
  dateFromChanged,
  dateToChanged,
  filtersApplied,
  priceFromChanged,
  priceToChanged,
  statusesChanged,
} from "../model";
import styles from "./Filters.module.scss";

const STATUSES = [
  { label: "Новый", value: "new" },
  { label: "Расчет", value: "calculation" },
  { label: "Подтвержден", value: "confirmed" },
  { label: "Отложен", value: "postponed" },
  { label: "Выполнен", value: "completed" },
  { label: "Отменен", value: "canceled" },
];

export const Filters = () => {
  const units = useUnit({
    dateFrom: $dateFrom,
    dateFromChanged,
    dateTo: $dateTo,
    dateToChanged,
    statuses: $statuses,
    statusesChanged,
    priceFrom: $priceFrom,
    priceFromChanged,
    priceTo: $priceTo,
    priceToChanged,
  });

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
            value={units.dateFrom}
            onChange={(e) => units.dateFromChanged(e.target.value)}
            placeholder="dd.mm.yyyy"
          />
          <Input
            className={styles.dateInput}
            prefix="до"
            allowClear={true}
            value={units.dateTo}
            onChange={(e) => units.dateToChanged(e.target.value)}
            placeholder="dd.mm.yyyy"
          />
        </div>
      </div>
      <div className={styles.formBlock}>
        <label className={styles.label} htmlFor="dateFrom">
          Статус заказа
        </label>
        <div className={styles.row}>
          <Select
            name="status"
            options={STATUSES}
            selected={units.statuses}
            onChange={(status) => units.statusesChanged(status)}
            multiple={true}
          />
        </div>
      </div>
      <div className={styles.formBlock}>
        <label className={styles.label} htmlFor="dateFrom">
          Сумма заказа
        </label>
        <div className={styles.row}>
          <Input
            className={styles.dateInput}
            prefix="от"
            id="dateFrom"
            allowClear={true}
            value={units.priceFrom}
            onChange={(e) => units.priceFromChanged(e.target.value)}
            placeholder="₽"
          />
          <Input
            className={styles.dateInput}
            prefix="до"
            allowClear={true}
            value={units.priceTo}
            onChange={(e) => units.priceToChanged(e.target.value)}
            placeholder="₽"
          />
        </div>
      </div>
      <div className={styles.formBlock}>
        <Button theme="blueReverse" onClick={() => filtersApplied()}>
          Применить
        </Button>
      </div>
    </div>
  );
};
