import { ReactNode } from 'react';
import styles from './TableFooter.module.scss';

type Props = { children: ReactNode };

export const TableFooter = ({ children }: Props) => {
  return <div className={styles.tableFooter}>{children}</div>
}
