import { ReactNode } from 'react';
import styles from './TableBody.module.scss';

type Props = {
  children: ReactNode;
};

export const TableBody = ({ children }: Props) => {
  return <div className={styles.tableBody}>{children}</div>
}
