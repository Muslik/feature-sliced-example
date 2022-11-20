import cls from "classnames";

import styles from "./Radio.module.scss";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export const Radio = ({ className, ...props }: Props) => {
  return (
    <input
      className={cls(styles.radio, className)}
      type="radio"
      {...props}
    />
  );
};

