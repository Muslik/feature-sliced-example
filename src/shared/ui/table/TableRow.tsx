import { ReactNode } from 'react';
import styles from './TableRow.module.scss';

type Props = { children: ReactNode };

export const TableRow = ({ children }: Props) => {
  return <div className={styles.tableRow}>{children}</div>
}
