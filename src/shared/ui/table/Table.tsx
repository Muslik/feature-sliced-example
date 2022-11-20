import styles from './Table.module.scss';

type Props = {
  children: ReactNode;
};

export const Table = ({ children }: Props) => {
  return <div className={styles.table}>{children}</div>
}
