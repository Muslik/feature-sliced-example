import { ReactNode } from "react";
import cls from "classnames";
import { Icon } from "src/shared/ui";
import { STATUSES_MAP } from "../constants";

import styles from "./OrderStatus.module.scss";

const ICON_MAP: Record<keyof typeof STATUSES_MAP, ReactNode> = {
  new: <Icon name="dot" className={styles.icon} />,
  calculation: <Icon name="dot" className={styles.icon} />,
  confirmed: <Icon name="dot" className={styles.icon} />,
  postponed: <Icon name="dot" className={styles.icon} />,
  completed: <Icon name="checkmark" className={styles.icon} />,
  declined: <Icon name="abort" className={styles.icon} />,
};

type Props = {
  status: keyof typeof STATUSES_MAP;
};

export const OrderStatus = ({ status }: Props) => {
  const icon = ICON_MAP[status];
  return (
    <div
      className={cls(styles.status, {
        [styles.new]: status === "new",
        [styles.postponed]: status === "postponed",
        [styles.confirmed]: status === "confirmed",
        [styles.calculation]: status === "calculation",
        [styles.completed]: status === "completed",
        [styles.declined]: status === "declined",
      })}
    >
      {icon}
      <span>{STATUSES_MAP[status]}</span>
    </div>
  );
};

