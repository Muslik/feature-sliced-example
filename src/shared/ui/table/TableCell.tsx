import { ReactNode } from 'react';
import cls from 'classnames';
import styles from './TableCell.module.scss';

type Props = { children: ReactNode } & React.HTMLAttributes<HTMLDivElement>;

export const TableCell = ({ children, className, ...props }: Props) => {
  return (
    <div className={cls(styles.tableCell, className)} {...props}>
      {children}
    </div>
  );
};
