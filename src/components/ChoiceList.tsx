import React from "react";
import { useChoices } from "../hooks/useChoices";
import { IFactor } from "../models/IFactor";
import styles from "../styles/choicelist.module.css";

interface ChoiceListProps {
  factors: IFactor[];
}

export const ChoiceList = ({ factors }: ChoiceListProps): JSX.Element => {
  // const [choices] = useChoices(factors);

  return (
    <section id="choices" className={styles.Container}>
      <span>
        <h2 className={styles.Title}>Choices</h2>
      </span>
      <input
        type="text"
        placeholder="Enter a new choice here"
        className={styles.ChoiceInput}
      />
    </section>
  );
};
