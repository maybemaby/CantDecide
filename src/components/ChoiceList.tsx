import styles from "../styles/choicelist.module.css";
import React, { useState } from "react";
import { useChoices } from "../hooks/useChoices";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IFactor } from "../models/IFactor";
import { Options, OptionsProps } from "./Options";
import { Modal } from "./Modal";
import { ChoiceCard } from "./ChoiceCard";
import { IChoice } from "../models/IChoice";
import { DropDown } from "./DropDown";

interface ChoiceListProps {
  factors: IFactor[];
}

export const ChoiceList = ({ factors }: ChoiceListProps): JSX.Element => {
  const [error, setError] = useState<string>("");
  const [showWeightedScores, setShowWeightedScores] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const { value, saveToStorage } = useLocalStorage<IChoice>("choices");
  const {
    choices,
    addChoice,
    toggleChoose,
    setScore,
    clearAll,
    sortByScore,
    removeChoice,
    restrictions,
  } = useChoices(factors, [saveToStorage], value);
  const [choiceInput, setChoiceInput] = useState<string>("");

  const handleOptionsToggle = (): void => {
    setShowOptions(!showOptions);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setChoiceInput(event.currentTarget.value);
  };

  // returns true if valid, false if invalid
  const validateChoice = (title: string): boolean => {
    setError("");
    const choiceTitles = choices.map((choice: IChoice): string => choice.title);
    if (choiceTitles.includes(title)) {
      setError("Choice already exists");
      return false;
    }
    if (choices.length >= restrictions.max) {
      setError("Maximum allowed choices reached");
      return false;
    }
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

  const selectOptions = [
    { value: "sort", label: "Sort by Score" },
    { value: "clear", label: "Clear all Choices" },
    { value: "options", label: "Options" },
  ];

  const handleSelect = (value: string) => {
    switch (value) {
      case "sort":
        sortByScore();
        break;
      case "clear":
        clearAll();
        break;
      case "options":
        handleOptionsToggle();
        break;
      default:
        return;
    }
  };

  return (
    <section id="choices" className={styles.Container}>
      <Modal<OptionsProps>
        BaseComponent={Options}
        baseComponentProps={{
          choiceRestrictions: restrictions,
          choices: choices,
          handleModalState: handleOptionsToggle,
          showWeighted: {
            state: showWeightedScores,
            set: setShowWeightedScores,
          },
        }}
        handleModalState={handleOptionsToggle}
        modalState={showOptions}
      />
      <span className={styles.Header}>
        <h2 className={styles.Title}>Choices</h2>
        <span className={styles.ButtonGroup}>
          <button
            className={styles.OptionsButton}
            onClick={handleOptionsToggle}
          >
            Options
          </button>
          <button className={`${styles.RoundButton}`} onClick={sortByScore}>
            Sort by score
          </button>
          <button className={`${styles.RoundButton}`} onClick={clearAll}>
            Clear choices
          </button>
        </span>
        <span className={styles.DropDownButton}>
          <DropDown
            options={selectOptions}
            container={{
              absolutePosition: { top: "10px", right: "15px" },
            }}
            onSelect={handleSelect}
          />
        </span>
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
                removeChoice={removeChoice}
                showWeighted={showWeightedScores}
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
        {error && <p>{error}</p>}
      </section>
    </section>
  );
};
