import { IChoice } from "../models/IChoice";
import { IScoredFactor } from "../models/IFactor";
import { UseChoicesReturn } from "../hooks/useChoices";
import styles from "../styles/choicecard.module.css";
import React, { useState } from "react";

export const FactorScoreInput = ({
  factor,
  choice,
  setScore,
}: {
  factor: IScoredFactor;
  choice: IChoice;
  setScore: UseChoicesReturn["setScore"];
}) => {
  const [error, setError] = useState<string>("");
  const handleScoreSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const score = parseInt(event.currentTarget.value);
    if (event.key === "Enter") {
      if (score >= 0 && score <= 10) {
        setScore(choice, factor, score);
      } else {
        setError("Value must be between 0 and 10");
      }
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
          onBlur={() => setError("")}
        />
        {error && (
          <p className={styles.Error}>Score must be between 0 and 10</p>
        )}
      </>
    );
  }
};
