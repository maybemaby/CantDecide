import { useState, useEffect } from "react";
import { IFactor } from "../models/IFactor";

export type EditFactorsFunc = (factor: IFactor) => void;
type UseFactorsFunc = (factors: IFactor[]) => any;

export interface UseFactorsReturn {
  factors: IFactor[];
  addFactor: EditFactorsFunc;
  removeFactor: EditFactorsFunc;
  removeAllFactors: (toRemove?: IFactor[]) => void;
}

export const useFactors = (
  onChange: UseFactorsFunc[],
  initialValue?: IFactor[]
): UseFactorsReturn => {
  const [factors, setFactors] = useState<IFactor[]>(() => {
    return initialValue ? initialValue : [];
  });

  useEffect(() => {
    onChange.forEach((changeFunc) => {
      changeFunc(factors);
    });
  }, [factors]);

  const calcWeights = (factorList: IFactor[]): IFactor[] => {
    const totalWeight = factorList.reduce((prev: number, current): number => {
      return prev + current.weight.assignedScore;
    }, 0);
    const updatedFactors = factorList.map((factor: IFactor): IFactor => {
      return {
        ...factor,
        weight: {
          assignedScore: factor.weight.assignedScore,
          trueWeighting:
            Math.round((factor.weight.assignedScore / totalWeight) * 1e3) / 1e3,
        },
      };
    });
    return updatedFactors;
  };

  const addFactor = (factor: IFactor): void => {
    const newFactors = [...factors];
    newFactors.push(factor);
    const weightedFactors = calcWeights(newFactors);
    setFactors(weightedFactors);
  };

  const removeFactor = (factor: IFactor): void => {
    const newFactors = factors.filter((insideFactor: IFactor): boolean => {
      return !(insideFactor.title === factor.title);
    });
    const weightedFactors = calcWeights(newFactors);
    setFactors(weightedFactors);
  };

  const removeAllFactors = (toRemove?: IFactor[]): void => {
    if (toRemove) {
      const removeTitles = toRemove.map(
        (factor: IFactor): string => factor.title
      );
      const newFactors = factors.filter((insideFactor: IFactor): boolean => {
        return !removeTitles.includes(insideFactor.title);
      });
      const weightedFactors = calcWeights(newFactors);
      setFactors(weightedFactors);
    } else {
      setFactors([]);
    }
  };

  return { factors, addFactor, removeFactor, removeAllFactors };
};
