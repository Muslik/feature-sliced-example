import cls from 'classnames';
import { LabelHTMLAttributes, ReactNode } from 'react';

import styles from './LabelControl.module.scss';

type Props = {
  control: ReactNode;
  label: string;
  hideToggle?: boolean;
} & LabelHTMLAttributes<HTMLLabelElement>;

export const LabelControl = ({ hideToggle, className, control, label, ...props }: Props) => {
  return (
    <label className={cls(styles.label, { [styles.hideToggle]: hideToggle }, className)} {...props}>
      {control}
      {label && (
        <span className={cls(styles.text, { [styles.textWithToggle]: !hideToggle })}>{label}</span>
      )}
    </label>
  );
};
