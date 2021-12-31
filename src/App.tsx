import React, { useState } from "react";
import "./styles/base.css";
import styles from "./styles/app.module.css";
import { ReactComponent as MoonIcon } from "./icons/moon.svg";
import { IFactor } from "./models/IFactor";
import { ChoiceList } from "./components/ChoiceList";
import { useFactors } from "./hooks/useFactors";

function App() {
  const [factors, addFactor, removeFactor] = useFactors();

  return (
    <div className={`${styles.App}`}>
      <header className={`${styles.Header}`}>
        <h1 className={`${styles.Title}`}>cantdecide.io</h1>
        <MoonIcon
          className={`${styles.DarkModeIcon} transition duration-300`}
        />
      </header>
      <section id="configuration" className={styles.Config}>
        <button
          type="button"
          className={`${styles.WideButton} transition duration-500`}
        >
          Edit Factors
        </button>
      </section>
      <ChoiceList factors={factors} />
    </div>
  );
}

export default App;
