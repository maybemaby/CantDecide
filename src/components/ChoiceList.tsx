import styles from "../styles/choicelist.module.css";
import React, { useState } from "react";
import { useChoices } from "../hooks/useChoices";
import { IFactor } from "../models/IFactor";
import { ChoiceCard } from "./ChoiceCard";
import { IChoice } from "../models/IChoice";

interface ChoiceListProps {
  factors: IFactor[];
}

export const ChoiceList = ({ factors }: ChoiceListProps): JSX.Element => {
  const {choices, addChoice, toggleChoose, setScore} = useChoices(factors);
  const [choiceInput, setChoiceInput] = useState<string>("");

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setChoiceInput(event.currentTarget.value);
  };

  // returns true if valid, false if invalid
  const validateChoice = (title: string): boolean => {
    const choiceTitles = choices.map((choice: IChoice): string => choice.title);
    if (choiceTitles.includes(title)) return false;
    return true;
  };

  const handleChoiceSubmit = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter" && choiceInput) {
      const id =
        choices.reduce(
          (prev, current) => {
            return prev.id > current.id ? prev : current;
          },
          { id: 0 }
        ).id + 1;
      const newChoice = {
        title: choiceInput.trim(),
        id: id,
      };
      if (validateChoice(newChoice.title)) {
        addChoice(newChoice);
      }
      setChoiceInput("");
    }
  };

  return (
    <section id="choices" className={styles.Container}>
      <span>
        <h2 className={styles.Title}>Choices</h2>
      </span>
      <section id="choice-list" className={styles.Body}>
        <ul>
          {choices.map((choice, index) => {
            return (
              <ChoiceCard
                key={index}
                choice={choice}
                toggleChoose={toggleChoose}
                setScore={setScore}
              />
            );
          })}
        </ul>
        <input
          type="text"
          placeholder="Enter a new choice here"
          className={styles.ChoiceInput}
          value={choiceInput}
          onChange={handleChange}
          onKeyPress={handleChoiceSubmit}
        />
      </section>
    </section>
  );
};
