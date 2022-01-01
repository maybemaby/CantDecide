import { useState, useEffect } from "react";
import { IChoice } from "../models/IChoice";
import { IFactor } from "../models/IFactor";

export const useChoices = (
  globalFactors: IFactor[]
): [
  IChoice[],
  (choice: { title: string; id: number }) => void,
  (chosenChoice: IChoice) => void
] => {
  const [choices, setChoices] = useState<IChoice[]>([]);

  useEffect(() => {
    if (choices.length > 0)
      if (globalFactors.length > choices[0].factors.length) {
        const newChoices = choices.map((choice: IChoice): IChoice => {
          const newFactors = choice.factors.slice();
          newFactors.push({ ...globalFactors.at(-1) } as IFactor); // since choices.length > 0, .at(-1) should always be defined.
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

  return [choices, addChoice, toggleChoose];
};
