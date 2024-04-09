import styles from "./components.module.css";
import { Button } from "@blueprintjs/core";
import { terminateTask } from "./startsprocess";
import { finishCreateTaskUserTaskAndNavigateToUrl } from "../task/[processInstanceId]/create/server-action";
import { useState, useEffect } from "react";
import { getUserTask } from "../utils/process-controlling.tsx";
import { UserTaskInstance } from "@5minds/processcube_engine_sdk";

export default function ReviewCreateTaskButtonComponent(props: any) { 
  const [currentTask, setCurrentTask] = useState<UserTaskInstance | null>(null);
  
  const flowNodeId = "ReviewCreateTaskRequest";

  useEffect(() => {
    getUserTask(props.data.processInstanzeId, flowNodeId).then((data) => {
      setCurrentTask(data);
    });
  }, []);

  return (
    <div className={styles.optionButtonContainer}>
      <Button className={styles.finishedButton} icon="tick" onClick={async () => finishCreateTaskUserTaskAndNavigateToUrl(currentTask, props.data.processInstanzeId, flowNodeId, props.data.description, props.data.description, true).then(() => location.reload())}/>
      <Button className={styles.cancelButton} icon="cross" onClick={async () => finishCreateTaskUserTaskAndNavigateToUrl(currentTask, props.data.processInstanzeId, flowNodeId, props.data.description, props.data.description, false).then(() => location.reload())}/>
    </div>
  )
}
