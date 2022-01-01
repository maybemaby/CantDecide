import { useForm, SubmitHandler } from "react-hook-form";
import { IFactor } from "../models/IFactor";
import { EditFactorsFunc } from "../hooks/useFactors";
import styles from "../styles/factorsmodal.module.css";
import React from "react";

export interface FactorSectionProps {
  factors: IFactor[];
  addFactor: EditFactorsFunc;
  removeFactor: EditFactorsFunc;
  removeAllFactors: (toRemove?: IFactor[]) => void;
}

interface FactorFormData {
  factorName: string;
  factorWeight: string;
}

export const FactorSection = ({
  factors,
  addFactor,
  removeFactor,
  removeAllFactors,
}: FactorSectionProps): JSX.Element => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FactorFormData>();

  const onSubmit: SubmitHandler<FactorFormData> = (
    data: FactorFormData,
    e?: React.BaseSyntheticEvent<object, HTMLFormElement, HTMLFormElement>
  ) => {
    addFactor({
      title: data.factorName,
      weight: { assignedScore: parseInt(data.factorWeight) },
    });
    if (e) {
      e.target.reset();
    }
  };

  const onClear = () => {
    removeAllFactors();
  };

  return (
    <>
      <div className={styles.HeaderSection}>
        <h2 className={styles.Header}>Factors</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.FormLayout}>
          <div className={styles.FormField}>
            <label htmlFor="factorName">Name</label>
            <input
              id="factorName"
              type="text"
              className={styles.FormInput}
              placeholder="New Factor Name"
              {...register("factorName", {
                required: true,
                validate: {
                  exists: (value) =>
                    !factors.map((factor) => factor.title).includes(value), // Check if factor with that title already exists}
                },
              })}
            />
            {errors.factorName?.type === "required" &&
              "Factor Name is required"}
            {errors.factorName?.type === "exists" &&
              `${errors.factorName?.ref?.value} is already a factor`}
          </div>
          <div className={styles.FormField}>
            <label htmlFor="factorWeight">Factor Weight (0-10)</label>
            <input
              type="number"
              id="factorWeight"
              className={`${styles.FormInput} ${styles.ThirdWidth}`}
              {...register("factorWeight", {
                required: true,
                min: { value: 0, message: "Weight must be higher than 0" },
                max: { value: 10, message: "Weight must be lower than 10" },
              })}
            />
            {errors.factorWeight?.type === "required" &&
              "Factor Weight is required"}
            {errors.factorWeight?.message ? errors.factorWeight.message : null}
          </div>
        </div>
        <button
          type="submit"
          className={`${styles.RoundButton} ${styles.DarkIndigo}`}
        >
          Add Factor
        </button>
        <button
          type="reset"
          className={`${styles.RoundButton} ${styles.Red}`}
          onClick={onClear}
        >
          Clear all factors
        </button>
      </form>
    </>
  );
};
