import { useForm } from "react-hook-form";
import { IFactor } from "../models/IFactor";
import { EditFactorsFunc } from "../hooks/useFactors";
import styles from "../styles/factorsmodal.module.css";

export interface FactorSectionProps {
  factors: IFactor[];
  addFactor: EditFactorsFunc;
  removeFactor: EditFactorsFunc;
}

interface FactorFormData {
  factorName: string;
  factorWeight: string;
}

export const FactorSection = ({
  factors,
  addFactor,
  removeFactor,
}: FactorSectionProps): JSX.Element => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FactorFormData>();

  const onSubmit = (data: FactorFormData) => {
    addFactor({
      title: data.factorName,
      weight: { assignedScore: parseInt(data.factorWeight) },
    });
    reset({});
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
              {...register("factorName", { required: true })}
            />
            {errors.factorName?.type === "required" &&
              "Factor Name is required"}
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
        <button type="reset" className={`${styles.RoundButton} ${styles.Red}`}>
          Clear all factors
        </button>
      </form>
    </>
  );
};
