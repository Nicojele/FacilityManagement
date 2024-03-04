'use client'

import styles from "./components.module.css";
import { startCreateTaskProcess } from "./startsprocess";

export default function CreateTaskForm() {
  return (
    <form action={startCreateTaskProcess}>
      <input className={styles.button} type="submit" value=" Create Task"/>
    </form>
  )
}
