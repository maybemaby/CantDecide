import { IFactor } from "../models/IFactor";
import styles from "../styles/factorsmodal.module.css";

export interface FactorSectionProps {
  factors: IFactor[];
}

export const FactorSection = ({ factors }: FactorSectionProps): JSX.Element => {
  return (
    <>
      <div className={styles.HeaderSection}>
        <h2 className={styles.Header}>Factors</h2>
      </div>
    </>
  );
};
