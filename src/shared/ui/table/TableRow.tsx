import { ReactNode } from 'react';
import cls from 'classnames';
import styles from './TableRow.module.scss';

type Props = { children: ReactNode } & React.HTMLAttributes<HTMLDivElement>;

export const TableRow = ({ children, className, ...props }: Props) => {
  return (
    <div className={cls(styles.tableRow, className)} {...props}>
      {children}
    </div>
  );
};
