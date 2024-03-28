'use client'

import styles from "./components.module.css";
import { startCreateTaskProcess } from "./startsprocess";
import LogoutButton from "../logoutbutton";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const session = useSession();
  
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
        {session.status == "authenticated" && (
          <li className={styles.signOutButton} onClick={() => signOut()}><a className={styles.link}>Sign Out</a></li>
        )}
        {session.data?.user?.claims["canReadAdminContent"] && session.status == "authenticated" ? (
          <li className={styles.requestetTasksButton} onClick={() => signOut()}><a href="/taskrequests" className={styles.link}>Requestet Tasks</a></li>
        ) :
          <></>
        }
      </ul>
    </form>
  )
}
