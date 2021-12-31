import { useState, useEffect } from "react";
import { IFactor } from "../models/IFactor";

type EditFactorsFunc = (factor: IFactor) => void;

export const useFactors = (): [IFactor[], EditFactorsFunc, EditFactorsFunc] => {
  const [factors, setFactors] = useState<IFactor[]>([]);


  const calcWeights = (): void => {
    const totalWeight = factors.reduce((prev: number, current): number => {
      return prev + current.weight.assignedScore;
    }, 0);
    const updatedFactors = factors.map((factor: IFactor): IFactor => {
      return {
        ...factor,
        weight: {
          assignedScore: factor.weight.assignedScore,
          trueWeighting:
            Math.round((factor.weight.assignedScore / totalWeight) * 1e3) / 1e3,
        },
      };
    });
    setFactors(updatedFactors);
  };

  const addFactor = (factor: IFactor): void => {
    setFactors([...factors, factor]);
    calcWeights();
  };

  const removeFactor = (factor: IFactor): void => {
    const newFactors = factors.filter((insideFactor: IFactor): boolean => {
      return !(insideFactor.title === factor.title);
    });
    setFactors(newFactors);
    calcWeights();
  };

  return [factors, addFactor, removeFactor];
};
