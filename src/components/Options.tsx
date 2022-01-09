import React, { SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UseChoicesReturn } from "../hooks/useChoices";
import { IChoice } from "../models/IChoice";
import modalStyles from "../styles/factorsmodal.module.css";

export interface OptionsProps {
  choiceRestrictions: UseChoicesReturn["restrictions"];
  choices: IChoice[];
  handleModalState: () => void;
  showWeighted: {
    state: boolean;
    set: React.Dispatch<SetStateAction<boolean>>;
  };
}

interface OptionsFormData {
  maxChoices?: number;
  showWeighted: boolean;
}

export const Options = ({
  choiceRestrictions,
  choices,
  handleModalState,
  showWeighted,
}: OptionsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OptionsFormData>({
    defaultValues: {
      maxChoices: choiceRestrictions.max,
      showWeighted: showWeighted.state,
    },
  });

  const onSubmit: SubmitHandler<OptionsFormData> = (
    data: OptionsFormData,
    _e?: React.BaseSyntheticEvent<object, HTMLFormElement, HTMLFormElement>
  ): void => {
    console.log(data);
    if (data.maxChoices) {
      choiceRestrictions.setMax(data.maxChoices);
    }
    showWeighted.set(data.showWeighted);
    handleModalState();
  };

  return (
    <div id="options">
      <h2 className={modalStyles.Header}>Options</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "20px 0" }}>
        <div className={`fields ${modalStyles.FlexWrapped}`}>
          <div
            className={`${modalStyles.FormField} ${modalStyles.StackedField}`}
          >
            <label htmlFor="maxChoices">Max # of choices</label>
            <input
              className={`${modalStyles.FormInput} ${modalStyles.Small}`}
              placeholder={choiceRestrictions.max.toString()}
              type="number"
              {...register("maxChoices", {
                valueAsNumber: true,
                required: false,
                min: choices.length > 2 ? choices.length : 2, // Minimum of 2 choice limit, or minimum current number of choices.
              })}
            />
            {errors.maxChoices?.type === "min" &&
              (choices.length < 2
                ? "Minimum of 2 choices"
                : "Already reached limit")}
          </div>
          <div>
            <label htmlFor="showWeighted">Show Weighted Scores</label>
            <input type="checkbox" {...register("showWeighted")} />
          </div>
        </div>
        <button
          type="submit"
          className={`${modalStyles.RoundButton} ${modalStyles.DarkIndigo}`}
        >
          Finish
        </button>
      </form>
    </div>
  );
};
