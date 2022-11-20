import { HTMLAttributes, ReactNode } from "react";
import cls from "classnames";
import styles from "./TableFooter.module.scss";

type Props = { children: ReactNode } & HTMLAttributes<HTMLDivElement>;

export const TableFooter = ({ children, className, ...props }: Props) => {
  return (
    <div className={cls(styles.tableFooter, className)} {...props}>
      {children}
    </div>
  );
};

