import styles from "./components.module.css";
import { Button } from "@blueprintjs/core";
import { terminateTask } from "./startsprocess";
import { finishUserTaskAndNavigateToUrl } from "../task/[processInstanceId]/create/server-action";
import { useState, useEffect } from "react";
import { getUserTask } from "../utils/process-controlling.tsx";
import { UserTaskInstance } from "@5minds/processcube_engine_sdk";

export default function ReviewFinishTaskButtonComponent(props: any) { 
  const [currentTask, setCurrentTask] = useState<UserTaskInstance | null>(null);
  
  const flowNodeId = "reviewTask";

  useEffect(() => {
    getUserTask(props.data.processInstanzeId, flowNodeId).then((data) => {
      setCurrentTask(data);
    });
  }, []);

  return (
    <div className={styles.optionButtonContainer}>
      <Button className={styles.finishedButton} data-testid="tick" icon="tick" name="tick" onClick={async () => finishUserTaskAndNavigateToUrl(currentTask, props.data.processInstanzeId, flowNodeId, props.data.description, props.data.category, props.data.date, true).then(() => location.reload())}/>
      <Button className={styles.cancelButton} icon='cross' onClick={async () => terminateTask(props.data.processInstanzeId).then(() => location.reload())}/>
    </div>
  )
}
