import { ReactNode, useEffect } from "react";
import cls from "classnames";
import styles from "./Modal.module.scss";

type Props = {
  isOpen: boolean;
  children: ReactNode;
  fullHeight?: boolean;
  position?: "right" | "center";
};

export const Modal = ({ isOpen, fullHeight, position, children }: Props) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen])

  if (!isOpen) return null;

  return (
    <>
      <div
        className={cls(styles.modalContent, {
          [styles.fullHeight]: fullHeight,
          [styles.positionRight]: position === "right",
          [styles.positionCenter]: position === "center",
        })}
      >
        {children}
      </div>
      <div className={styles.modalOverlay} />
    </>
  );
};

