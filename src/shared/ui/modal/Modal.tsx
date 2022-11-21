import { ReactNode, useEffect } from 'react';
import cls from 'classnames';
import { useMobile } from 'src/shared/lib';

import styles from './Modal.module.scss';

type Props = {
  isOpen: boolean;
  children: ReactNode;
  fullHeight?: boolean;
  position?: 'right' | 'center';
  fullScreenOnMobile?: boolean;
};

export const Modal = ({
  isOpen,
  fullHeight,
  position = 'right',
  children,
  fullScreenOnMobile,
}: Props) => {
  const isMobile = useMobile();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className={cls(styles.modalContent, {
          [styles.fullHeight]: fullHeight,
          [styles.positionRight]: position === 'right',
          [styles.positionCenter]: position === 'center',
          [styles.fullScreen]: isMobile && fullScreenOnMobile,
        })}
      >
        {children}
      </div>
      <div className={styles.modalOverlay} />
    </>
  );
};
