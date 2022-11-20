import { ReactNode } from "react";
import cls from "classnames";
import { Icon } from "../icon/Icon";
import styles from "./TableHeaderCell.module.scss";

type Props = {
  isActive?: boolean;
  direction?: "asc" | "desc";
  onSort?: () => void;
  children: ReactNode;
  className?: string;
};

export const TableHeaderCell = ({
  isActive,
  direction,
  onSort,
  children,
  className,
}: Props) => {
  return (
    <div
      className={cls(styles.tableHeaderCell, { [styles.active]: isActive }, className)}
      onClick={onSort}
    >
      {children}
      {onSort && (
        <Icon
          name="varrow"
          className={cls(styles.icon, {
            [styles.iconReversed]: direction === "asc",
          })}
        />
      )}
    </div>
  );
};
