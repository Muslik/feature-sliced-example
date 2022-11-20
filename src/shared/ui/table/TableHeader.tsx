import { ReactNode } from 'react';
import styles from './TableHeader.module.scss';

type Props = { children: ReactNode };

export const TableHeader = ({ children }: Props) => {
  return <div className={styles.tableHeader}>{children}</div>
}
