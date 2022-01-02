import { IChoice } from "../models/IChoice";
import { IScoredFactor } from "../models/IFactor";
import { UseChoicesReturn } from "../hooks/useChoices";
import styles from "../styles/choicecard.module.css";
import React from "react";

export const FactorScoreInput = ({
  factor,
  choice,
  setScore,
}: {
  factor: IScoredFactor;
  choice: IChoice;
  setScore: UseChoicesReturn["setScore"];
}) => {
  const handleScoreSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setScore(choice, factor, parseInt(event.currentTarget.value));
    }
  };

  if (factor.score) {
    return <>{factor.score}</>;
  } else {
    return (
      <>
        <input
          type="number"
          name={choice.title}
          placeholder="Enter a score (0-10)"
          className={styles.ScoreInput}
          onKeyDown={handleScoreSubmit}
        />
      </>
    );
  }
};
