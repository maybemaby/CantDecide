import styles from "../styles/choicecard.module.css";
import { IChoice } from "../models/IChoice";
import { ReactComponent as StarIcon } from "../icons/star.svg";
import { ReactComponent as FilledStarIcon } from "../icons/star-filled.svg";

interface ChoiceCardProps {
  choice: IChoice;
  toggleChoose: (chosen: IChoice) => void;
}

export const ChoiceCard = ({
  choice,
  toggleChoose,
}: ChoiceCardProps): JSX.Element => {
  const handleChoose = (): void => {
    toggleChoose(choice);
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
    </li>
  );
};
