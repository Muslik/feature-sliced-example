import cls from 'classnames';

import styles from './Checkbox.module.scss';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Checkbox = ({ className, ...props }: Props) => {
  return <input className={cls(styles.checkbox, className)} type="checkbox" {...props} />;
};
