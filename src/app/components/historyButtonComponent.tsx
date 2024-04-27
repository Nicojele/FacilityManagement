import styles from "./components.module.css";
import { Button } from "@blueprintjs/core";
import { terminateTask } from "./startsprocess";

export default function HistoryButtonComponent(props: any) { 
  return (
    <div className={styles.optionButtonContainer}>
      <Button className={styles.cancelButton} icon="cross" onClick={async () => terminateTask(props.data.processInstanzeId).then(() => location.reload())}/>
    </div>
  )
}
