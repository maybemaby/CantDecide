import { IFactor } from "../models/IFactor";
import styles from "../styles/factortable.module.css";

export const FactorTable = ({
  factors,
  removeFactor,
}: {
  factors: IFactor[];
  removeFactor: (factor: IFactor) => void;
}) => {
  return (
    <div className={styles.Container}>
      <table className={styles.Table}>
        <thead className={styles.TableHead}>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Weight</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {factors.map((factor: IFactor, index: number) => {
            return (
              <tr key={index} className={styles.TableRow}>
                <td>{index + 1}</td>
                <td>{factor.title}</td>
                <td>{factor.weight.assignedScore}</td>
                <td>
                  <button
                    type="button"
                    className={styles.DeleteButton}
                    onClick={() => removeFactor(factor)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
