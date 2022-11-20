import { ReactNode } from "react";
import styles from "./TableRow.module.scss";

type Props = { children: ReactNode } & React.HTMLAttributes<HTMLDivElement>;

export const TableRow = ({ children, ...props }: Props) => {
  return (
    <div className={styles.tableRow} {...props}>
      {children}
    </div>
  );
};

