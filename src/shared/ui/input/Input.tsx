import {
  useState,
  ReactNode,
  SyntheticEvent,
  MouseEvent,
  useRef,
  ChangeEvent,
  forwardRef,
} from 'react';
import cls from 'classnames';
import { useMergedRef } from '../../lib';
import { Icon } from '../';

import styles from './Input.module.scss';

const composeEventHandlers = <T extends SyntheticEvent>(
  firstEventHandler: (event: T) => void,
  secondEventHandler?: (event: T) => void,
) => {
  return (event: T): void => {
    if (secondEventHandler) {
      secondEventHandler(event);
    }
    firstEventHandler(event);
  };
};

type Props = {
  hasError?: boolean;
  postfix?: ReactNode;
  prefix?: ReactNode;
  allowClear?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'>;

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      allowClear,
      postfix,
      prefix,
      onChange,
      onFocus,
      onBlur,
      hasError,
      className,
      disabled,
      value,
      ...props
    }: Props,
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const multiRef = useMergedRef(inputRef, ref);
    const [isFocused, setIsFocused] = useState(false);
    const hasClearButton = allowClear && !disabled && value && isFocused;
    const hasPostfix = postfix || disabled;
    const hasPrefix = prefix;

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const handleReset = (event: MouseEvent<HTMLButtonElement>) => {
      if (!onChange) {
        return;
      }
      if (inputRef.current) {
        const currentTarget = inputRef.current.cloneNode(true) as HTMLInputElement;

        const newEvent: ChangeEvent<HTMLInputElement> = Object.create(event, {
          target: { value: currentTarget },
          currentTarget: { value: currentTarget },
        });

        currentTarget.value = '';
        onChange(newEvent);
      }
    };

    const getPostfix = () => {
      if (disabled) {
        return <Icon name="locked" className={styles.iconDisabled} />;
      }
      return postfix;
    };

    return (
      <div className={cls(styles.inputWrapper, className)}>
        {hasPrefix && <div className={styles.prefix}>{prefix}</div>}
        <input
          ref={multiRef}
          disabled={disabled}
          onChange={onChange}
          onFocus={composeEventHandlers(handleFocus, onFocus)}
          onBlur={composeEventHandlers(handleBlur, onBlur)}
          value={value}
          className={cls(styles.input, {
            [styles.withError]: hasError,
            [styles.withPostfix]: hasPostfix,
            [styles.withPrefix]: hasPrefix,
          })}
          {...props}
        />
        {hasClearButton && (
          <button
            onClick={handleReset}
            className={styles.clearButton}
            onMouseDown={(event) => event.preventDefault()}
          >
            <Icon name="xmedium" className={styles.iconClear} />
          </button>
        )}
        {hasPostfix && <div className={styles.postfix}>{getPostfix()}</div>}
      </div>
    );
  },
);
