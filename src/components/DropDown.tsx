import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as MoreIcon } from "../icons/more-horizontal.svg";
import styles from "../styles/dropdown.module.css";

interface DropDownProps {
  container?: {
    absolutePosition?: {
      top?: string;
      right?: string;
      left?: string;
      bottom?: string;
    };
    width?: string;
    height?: string;
  };
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
}

export const DropDown = ({ options, onSelect, container }: DropDownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const nodeRef = useRef(null);
  const handleClick = (value: string) => {
    onSelect(value);
    setOpen(false);
  };

  const toggleOpen = () => setOpen(!open);
  return (
    <div
      className={styles.Container}
      style={
        container?.absolutePosition
          ? { ...container.absolutePosition, position: "absolute" }
          : undefined
      }
    >
      <button className={styles.Trigger} onClick={toggleOpen}>
        <MoreIcon />
      </button>
      <CSSTransition
        in={open}
        timeout={200}
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          enterDone: styles.enterDone,
          exit: styles.exit,
          exitActive: styles.exitActive,
          exitDone: styles.exitDone,
        }}
        nodeRef={nodeRef}
      >
        <ul className={styles.ListContainer} ref={nodeRef}>
          {options.map((option, index) => {
            return (
              <li
                key={index}
                onClick={() => handleClick(option.value)}
                className={styles.ListItem}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      </CSSTransition>
    </div>
  );
};
