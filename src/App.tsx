import React, { useState } from "react";
import "./styles/base.css";
import styles from "./styles/app.module.css";
import { ReactComponent as MoonIcon } from "./icons/moon.svg";
import { ChoiceList } from "./components/ChoiceList";
import { Modal } from "./components/Modal";
import { FactorSection, FactorSectionProps } from "./components/FactorSection";
import { IFactor } from "./models/IFactor";
import { useFactors } from "./hooks/useFactors";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const { value, saveToStorage } = useLocalStorage<IFactor>("factors");
  const { factors, addFactor, removeFactor, removeAllFactors } = useFactors(
    [saveToStorage],
    value
  );
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = (): void => {
    setShowModal(!showModal);
  };

  return (
    <div className={`${styles.App}`}>
      <header className={`${styles.Header}`}>
        <h1 className={`${styles.Title}`}>cantdecide.io</h1>
        <MoonIcon
          className={`${styles.DarkModeIcon} transition duration-300`}
        />
      </header>
      <Modal<FactorSectionProps>
        modalState={showModal}
        handleModalState={handleModalToggle}
        BaseComponent={FactorSection}
        baseComponentProps={{
          factors,
          addFactor,
          removeFactor,
          removeAllFactors,
        }}
      />
      <section id="configuration" className={styles.Config}>
        <button
          type="button"
          className={`${styles.WideButton} transition duration-500`}
          onClick={handleModalToggle}
        >
          Edit Factors
        </button>
      </section>
      <ChoiceList factors={factors} />
    </div>
  );
}

export default App;
