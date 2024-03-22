'use client'

import styles from "./page.module.css";

export default function ConfirmTask() {
  return (
    <main className={styles.main}>
      <form className={styles.confirmForm}>
        <div className={styles.confirmContainer}>
          <div className={styles.taskdatatContainer}>
            <h1 className={styles.taskHeader}>Task</h1>
            <p className={styles.descriptionHeader}>Beschreibung: </p>
            <div className={styles.descriptionContainer}>
              <p className={styles.description}>Das ist keine echte beshreibung, eine echt beshcreibung sollte schon mehr inhalt haben</p>
            </div>
            <p className={styles.categoryHeader}>Kategorie</p>
            <div className={styles.categoryContainer}>
              <p className={styles.category}>Das ist auch keine echte kategorie</p>
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.confirmButtonContainer}>
                <button className={styles.confirmButton}>confirm</button>
              </div>
              <div className={styles.denyButtonContainer}>
                <button className={styles.denyButton}>deny</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}
