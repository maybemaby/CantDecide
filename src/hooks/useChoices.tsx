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
  clearAll: () => number;
  sortByScore: () => void;
}

export const useChoices = (globalFactors: IFactor[]): UseChoicesReturn => {
  const [choices, setChoices] = useState<IChoice[]>([]);

  useEffect(() => {
    if (choices.length > 0)
      if (globalFactors.length > choices[0].factors.length) {
        const newChoices = choices.map((choice: IChoice): IChoice => {
          const newFactors = choice.factors.slice();
          newFactors.forEach((value: IFactor, index: number) => {
            value.weight = globalFactors[index].weight;
          });
          newFactors.push({ ...globalFactors.at(-1) } as IFactor); // since choices.length > 0, .at(-1) should always be defined.A
          return { ...choice, factors: newFactors };
        });
        setChoices(recalcScores(newChoices));
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
          newFactors.forEach((value: IFactor, index: number) => {
            value.weight = globalFactors[index].weight;
          });
          return { ...choice, factors: newFactors };
        });
        setChoices(recalcScores(newChoices));
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

  const recalcScores = (toCalc: IChoice[]): IChoice[] => {
    const recalculated = toCalc.map((choice: IChoice): IChoice => {
      const newFactors = choice.factors.map(
        (factor: IScoredFactor): IScoredFactor => {
          if (factor.score) {
            return {
              ...factor,
              trueScore:
                Math.round(
                  factor.score * (factor.weight.trueWeighting as number) * 1e2
                ) / 1e2,
            };
          } else return { ...factor };
        }
      );
      return { ...choice, factors: newFactors };
    });
    return recalculated;
  };

  const clearAll = (): number => {
    const toDelete = choices.length;
    setChoices([]);
    return toDelete;
  };

  const calcTotalTrueScore = (choice: IChoice): number => {
    const total = choice.factors.reduce((prev: number, current): number => {
      return prev + (current.trueScore || 0);
    }, 0);
    return total;
  };

  const sortByScore = (): void => {
    if (choices.length <= 0) return;
    const sortedChoices = [...choices];
    sortedChoices.forEach((choice) => (choice.chosen = false));
    sortedChoices.sort((prevChoice, nextChoice): number => {
      return calcTotalTrueScore(nextChoice) - calcTotalTrueScore(prevChoice);
    });
    setChoices(sortedChoices);
  };

  return { choices, addChoice, toggleChoose, setScore, clearAll, sortByScore };
};
