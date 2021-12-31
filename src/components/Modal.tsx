import { ReactComponent as XIcon } from "../icons/x.svg";
import styles from "../styles/modal.module.css";

interface ModalProps<T> {
  modalState: boolean;
  handleModalState: () => void;
  BaseComponent: React.FC<T>;
  baseComponentProps: T;
}

export function Modal<T>({
  modalState,
  handleModalState,
  BaseComponent,
  baseComponentProps,
}: ModalProps<T>): JSX.Element {
  return (
    <>
      {modalState ? (
        <div onClick={handleModalState} className={styles.OuterContainer}>
          <div
            className={styles.Container}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.ExitButton}
              onClick={handleModalState}
            >
              <XIcon />
            </button>
            <BaseComponent {...baseComponentProps} />
          </div>
        </div>
      ) : null}
    </>
  );
}
