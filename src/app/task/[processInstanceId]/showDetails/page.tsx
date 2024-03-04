'use client'

import { useState, useEffect } from 'react';
import { getUserTask } from 'src/app/utils/process-controlling.tsx';
import { UserTaskInstance } from "@5minds/processcube_engine_sdk";
import { NavigationParams } from '../create/navigation-params';
import styles from "./page.module.css";

export default function CreateTaskForm(params: NavigationParams) {
  const [currentTask, setCurrentTask] = useState<UserTaskInstance | null>(null);
  const [pageIsLoading, setPageLoading] = useState(true);

  const flowNodeId = "finishTask";

  const processInstanceId = params.params.processInstanceId;

  useEffect(() => {
    getUserTask(processInstanceId, flowNodeId).then((data) => {
      setCurrentTask(data);
      if (data) setPageLoading(false);
    });
  }, []);

  if (pageIsLoading) return (
    <main className={styles.main}>
      <form className={styles.form}>
        <div className={styles.loader} />
      </form>
    </main>
  )
  else return (
    <main className={styles.main}>
      <form className={styles.form}>
        <div className={styles.viewConatiner}>
          <div className={styles.descriptionContainer}>
            <h1 style={{ color: "black", textDecoration: "underline" }}>Beschreibung</h1>
            <p style={{ color: "black", marginTop:"2%", fontSize: "20px"}}>{ currentTask.startToken.payload.description}</p>
          </div>
          <div className={styles.categoryConatiner}>
            <h1 style={{ color: "black", textDecoration: "underline" }}>Kategorie</h1>
            <p style={{ color: "black", marginTop:"2%", fontSize: "20px"}}>{ currentTask.startToken.payload.category}</p>
          </div>
        </div>
      </form>
    </main>
  )
}
