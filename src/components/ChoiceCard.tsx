import styles from "../styles/choicecard.module.css";
import { IChoice } from "../models/IChoice";
import { ReactComponent as StarIcon } from "../icons/star.svg";
import { ReactComponent as FilledStarIcon } from "../icons/star-filled.svg";
import { ReactComponent as TrashIcon } from "../icons/trash-2.svg";
import { FactorScoreInput } from "./FactorScoreInput";
import { UseChoicesReturn } from "../hooks/useChoices";

interface ChoiceCardProps {
  choice: IChoice;
  toggleChoose: (chosen: IChoice) => void;
  setScore: UseChoicesReturn["setScore"];
  removeChoice: (choice: IChoice) => void;
  showWeighted: boolean;
}

export const ChoiceCard = ({
  choice,
  toggleChoose,
  setScore,
  removeChoice,
  showWeighted,
}: ChoiceCardProps): JSX.Element => {
  const handleChoose = (): void => {
    toggleChoose(choice);
  };

  const handleRemove = (): void => {
    removeChoice(choice);
  };

  return (
    <li
      id={choice.id.toString()}
      className={`${styles.Container} ${choice.chosen ? styles.Chosen : null}`}
    >
      <div className={styles.Title}>{choice.title}</div>
      {choice.chosen ? (
        <FilledStarIcon className={styles.StarIcon} onClick={handleChoose} />
      ) : (
        <StarIcon className={styles.StarIcon} onClick={handleChoose} />
      )}
      <TrashIcon className={styles.TrashIcon} onClick={handleRemove} />
      <ul>
        {choice.factors.map((factor, index) => {
          return (
            <li key={index} id={index.toString()} className={""}>
              {factor.title}:{" "}
              <FactorScoreInput
                choice={choice}
                factor={factor}
                setScore={setScore}
                showWeighted={showWeighted}
              />
            </li>
          );
        })}
      </ul>
    </li>
  );
};
