import { IChoice } from "../models/IChoice";
import { IScoredFactor } from "../models/IFactor";
import { UseChoicesReturn } from "../hooks/useChoices";
import styles from "../styles/choicecard.module.css";
import React, { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

export const FactorScoreInput = ({
  factor,
  choice,
  setScore,
  showWeighted,
}: {
  factor: IScoredFactor;
  choice: IChoice;
  setScore: UseChoicesReturn["setScore"];
  showWeighted: boolean;
}) => {
  const [error, setError] = useState<string>("");

  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const score = parseInt(event.target.value);
    if (score >= 0 && score <= 10) {
      setScore(choice, factor, score);
      setError("");
    } else {
      setError("Value must be between 0 and 10");
    }
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(handleScoreChange, 500),
    [choice, factor]
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  const handleScoreSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const score = parseInt(event.currentTarget.value);
    if (event.key === "Enter") {
      if (score >= 0 && score <= 10) {
        setScore(choice, factor, score);
        setError("");
      } else {
        setError("Value must be between 0 and 10");
      }
    }
  };

  // Resets to last value if there is an error.
  const handleBlur = (event: React.FormEvent<HTMLInputElement>) => {
    if (error !== "") {
      event.currentTarget.value = factor.score?.toString() || "";
    }
  };

  if (factor.score) {
    return (
      <>
        <span>
          <input
            type="number"
            name={choice.title}
            className={styles.FilledScoreInput}
            placeholder={factor.score.toString()}
            onBlur={handleBlur}
            onChange={debouncedChangeHandler}
          />
          {showWeighted && <p>Weighted Score: {factor.trueScore}</p>}
        </span>
        {error && (
          <p className={styles.Error}>Score must be between 0 and 10</p>
        )}
      </>
    );
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
