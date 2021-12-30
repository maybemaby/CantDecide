import React from "react";
import logo from "./logo.svg";
import { ReactComponent as MoonIcon } from "./icons/moon.svg";
import "./styles/base.css";
import styles from "./styles/app.module.css";

function App() {
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
    </div>
  );
}

export default App;
