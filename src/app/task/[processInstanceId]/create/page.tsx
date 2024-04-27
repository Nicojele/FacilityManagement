'use client'

import { NavigationParams } from './navigation-params';
import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import { finishCreateUserTaskAndNavigateToUrl } from "./server-action";
import { UserTaskInstance } from "@5minds/processcube_engine_sdk";
import { navigateHome } from 'src/app/utils/navigation';
import { getUserTask } from 'src/app/utils/process-controlling.tsx';

export default function CreateTaskForm(params: NavigationParams) {
  const [currentTask, setCurrentTask] = useState<UserTaskInstance | null>(null);
  const [pageIsLoading, setPageLoading] = useState(true);

  const flowNodeId = "requestTask";

  const processInstanceId = params.params.processInstanceId;

  useEffect(() => {
    getUserTask(processInstanceId, flowNodeId).then((data) => {
      setCurrentTask(data);
      if (data) setPageLoading(false);
    });
  }, []);

   const userTaskAlreadyFinished = currentTask?.state === 'finished' || currentTask?.state === 'terminated';
  if (userTaskAlreadyFinished) {
    navigateHome();
  }

  async function submit(formData: FormData) {
    const description = formData.get('description').toString();
    const category = formData.get('category').toString();
    const date = new Date();
    const finishTask = finishCreateUserTaskAndNavigateToUrl(
      currentTask,
      processInstanceId,
      flowNodeId,
      description,
      category,
      date,
    );

    return finishTask;
  }

  if (pageIsLoading) return (
    <main className={styles.main}>
      <form action={submit} className={styles.createTaskForm}>
        <div className={styles.loader} />
      </form>
    </main>
  )
  else return (
    <main className={styles.main}>
      <form action={submit} className={styles.createTaskForm}>
        <div className={styles.createTaskContainer}>
          <h1 className={styles.DescriptionHeader}>Please enter a description</h1>
          <input type='text' className={styles.descriptionInput} id={"descriptionInput"} name='description'></input>
          <h1 className={styles.categoryheader}>Select a category</h1>
          <select className={styles.dropdown} id={"categoryInput"} name='category'>
            <option></option>
            <option className={styles.dropdownItem} value="Wichtig & Dringend">Wichtig und Dringend</option>
            <option className={styles.dropdownItem} value="Wichtig">Wichtig</option>
            <option className={styles.dropdownItem} value="Dringend">Dringend</option>
            <option className={styles.dropdownItem} value="Nicht Wichtig & Nicht Dringend">Nicht Wichtig & Nicht Dringend</option>
          </select>
          <div className={styles.buttonContainer}>
            <button className={styles.submitdataButton}>Create Task</button>
          </div>
        </div>
      </form>
    </main>
  )
}
