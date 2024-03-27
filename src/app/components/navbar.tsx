'use client'

import styles from "./components.module.css";
import { startCreateTaskProcess } from "./startsprocess";
import LogoutButton from "../logoutbutton";

export default function Navbar() {

  function submitFormWithAction() {
      var form = document.getElementById("form") as HTMLFormElement;
      if (form) {
          form.submit();
      }
  }

  return (
    <form action={startCreateTaskProcess} id="form">
      <ul className={styles.navbar}>
        <li className={styles.navbarLink}><a href="/" className={styles.link}>Home</a></li>
        <li className={styles.navbarLink}><a href="/history" className={styles.link}>History</a></li>
        <li className={styles.createTaskLink} onClick={() => submitFormWithAction()}><a className={styles.link}>Create</a></li>
        <LogoutButton/>
      </ul>
    </form>
  )
}
