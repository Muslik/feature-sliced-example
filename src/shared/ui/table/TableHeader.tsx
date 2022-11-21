import { ReactNode } from 'react';
import cls from 'classnames';
import styles from './TableHeader.module.scss';

type Props = { children: ReactNode } & React.HTMLAttributes<HTMLDivElement>;

export const TableHeader = ({ children, className }: Props) => {
  return <div className={cls(styles.tableHeader, className)}>{children}</div>;
};
