import { useState, useEffect } from "react";
import { IChoice } from "../models/IChoice";
import { IFactor, IScoredFactor } from "../models/IFactor";

export interface UseChoicesReturn {
  choices: IChoice[];
  addChoice: (choice: { title: string; id: number }) => void;
  toggleChoose: (chosenChoice: IChoice) => void;
  setScore: (
    setChoice: IChoice,
    setFactor: IScoredFactor,
    score: number
  ) => void;
}

export const useChoices = (
  globalFactors: IFactor[]
): UseChoicesReturn => {
  const [choices, setChoices] = useState<IChoice[]>([]);

  useEffect(() => {
    if (choices.length > 0)
      if (globalFactors.length > choices[0].factors.length) {
        const newChoices = choices.map((choice: IChoice): IChoice => {
          const newFactors = choice.factors.slice();
          newFactors.push({ ...globalFactors.at(-1) } as IFactor); // since choices.length > 0, .at(-1) should always be defined.A
          return { ...choice, factors: newFactors };
        });
        setChoices(newChoices);
      } else if (globalFactors.length < choices[0].factors.length) {
        const factorTitles = globalFactors.map(
          (factor: IFactor): string => factor.title
        );
        const newChoices = choices.map((choice: IChoice): IChoice => {
          const newFactors = choice.factors.filter(
            (factor: IFactor): boolean => {
              return factorTitles.includes(factor.title);
            }
          );
          return { ...choice, factors: newFactors };
        });
        setChoices(newChoices);
      }
  }, [globalFactors]);

  const addChoice = (choice: { title: string; id: number }): void => {
    const newChoice = { ...choice, chosen: false, factors: [...globalFactors] };
    setChoices([...choices, newChoice]);
  };

  const toggleChoose = (chosenChoice: IChoice): void => {
    const newChoices = choices.map((choice: IChoice): IChoice => {
      if (choice.title === chosenChoice.title) {
        return { ...choice, chosen: !choice.chosen };
      } else return choice;
    });
    setChoices(newChoices);
  };

  const setScore = (
    setChoice: IChoice,
    setFactor: IScoredFactor,
    score: number
  ): void => {
    const newFactors = setChoice.factors.map(
      (factor: IScoredFactor): IScoredFactor => {
        if (setFactor.title === factor.title) {
          return {
            ...factor,
            score: score,
            trueScore:
              Math.round(
                score * (factor.weight.trueWeighting as number) * 1e2
              ) / 1e2,
          };
        } else return { ...factor };
      }
    );
    const newChoices = choices.map((choice: IChoice): IChoice => {
      if (choice.title === setChoice.title) {
        return { ...choice, factors: newFactors };
      } else return { ...choice };
    });
    setChoices(newChoices);
  };

  return {choices, addChoice, toggleChoose, setScore};
};
