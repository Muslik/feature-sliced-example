import cls from 'classnames';
import { forwardRef } from 'react';
import { Icon, IconName } from 'src/shared/ui';

import styles from './Button.module.scss';

type Props = {
  theme?: 'blue' | 'blueReverse' | 'blackReverse' | 'danger';
  size?: 'medium' | 'small';
  icon?: IconName;
  withFullWidth?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { icon, theme = 'blue', size = 'medium', children, className, withFullWidth, ...props }: Props,
    ref,
  ) => {
    const buttonClass = cls(
      styles.button,
      styles[`theme_${theme}`],
      styles[`size_${size}`],
      {
        [styles.iconOnly]: icon && !children,
        [styles.withFullWidth]: withFullWidth,
      },
      className,
    );

    return (
      <button className={buttonClass} ref={ref} {...props}>
        {icon && <Icon name={icon} className={styles.icon} />}
        {children && <span className={styles.text}>{children}</span>}
      </button>
    );
  },
);
