import { useState, useEffect } from "react";
import { IChoice } from "../models/IChoice";
import { IFactor } from "../models/IFactor";

export const useChoices = (
  globalFactors: IFactor[]
): [IChoice[], (choice: IChoice) => void] => {
  const [choices, setChoices] = useState<IChoice[]>([]);

  useEffect(() => {
    if (globalFactors.length > choices[0].factors.length) {
      const newChoices = choices.map((choice: IChoice): IChoice => {
        const newFactors = choice.factors.slice();
        newFactors.push({ ...globalFactors[-1] });
        return { ...choice, factors: newFactors };
      });
      setChoices(newChoices);
    } else if (globalFactors.length < choices[0].factors.length) {
      const factorTitles = globalFactors.map(
        (factor: IFactor): string => factor.title
      );
      const newChoices = choices.map((choice: IChoice): IChoice => {
        const newFactors = choice.factors.filter((factor: IFactor): boolean => {
          return factorTitles.includes(factor.title);
        });
        return { ...choice, factors: newFactors };
      });
      setChoices(newChoices);
    }
  }, [globalFactors]);

  const addChoice = (choice: { title: string; id: number }): void => {
    const newChoice = { ...choice, chosen: false, factors: [...globalFactors] };
    setChoices([...choices, newChoice]);
  };

  return [choices, addChoice];
};
