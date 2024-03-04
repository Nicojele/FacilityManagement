'use client';
import styles from "./history.module.css";
import TaskComponent from "../components/taskComponent";
import { useEffect, useState } from "react";
import { Button } from "@blueprintjs/core";
import { getProcessInstanzess } from "../components/startsprocess";

interface HistoryState {
  tasks: any[]
  filteredTasks: any[]
  isFiltered: boolean
  isLoading: boolean
}

export default function ShowOrderView() {
  const [state, setState] = useState<HistoryState>({
    tasks: [],
    filteredTasks: [],
    isFiltered: false,
    isLoading: true
  });

  useEffect(() => {
    async function fetchData() {
      const instanzess = []
      const processInstanzes = getProcessInstanzess();
      (await processInstanzes).processInstances.forEach((instanz) => {
        if (instanz.state == "finished") {
          instanzess.push({
            description: instanz.startToken.payload.description, category: instanz.startToken.payload.category, finished: true, processInstanzeId: instanz.processInstanceId
          })
        }
      });
      setState({ tasks: instanzess, filteredTasks: state.filteredTasks, isFiltered: state.isFiltered, isLoading: false })
    }
    fetchData();
  }, [])

  function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (category: string) => {
      filterTasks(category)
      setIsOpen(false);
    };

    return (
        <div>
          <Button icon="filter" className={styles.dropbtn} onClick={toggleDropdown}></Button>
          {isOpen && (
            <div className={styles.dropdownContent}>
              <a href="#" onClick={() => setState({ filteredTasks: [], isFiltered: false, tasks: state.tasks, isLoading: state.isLoading })}>Ohne Filter</a>
              <a href="#" onClick={() => handleItemClick("Wichtig & Dringend")}>wichtig & dringend</a>
              <a href="#" onClick={() => handleItemClick("Wichtig")}>wichtig & nicht dringend</a>
              <a href="#" onClick={() => handleItemClick("Dringend")}>nicht wichtig & dringend</a>
              <a href="#" onClick={() => handleItemClick("Nicht Wichtig & Nicht Dringend")}>nicht wichtig & nicht dringend</a>
          </div>
          )}
        </div>
    )
  }

  function filterTasks(category: string) {
    const filteredTasks: Array<any> = [];
    for (let index = 0; index < state.tasks.length; index++) {
      const task = state.tasks[index];
      
      if (task.category == category) {
        filteredTasks.push(task);
      }
    }

    setState({ filteredTasks: filteredTasks, isFiltered: true, tasks: state.tasks, isLoading: state.isLoading })
  }

  if (state.isLoading) {
    return(
      <main className={styles.main}>
        <div className={styles.body}>
          <div className={styles.loader} />
        </div>
      </main>
    )
  }

  if (state.isFiltered == false) {
    return (
      <main className={styles.main}>
        <div className={styles.body}>
          <div className={styles.bar}>
            <div className={styles.dropdown}>
              <Dropdown/>
            </div>
          </div>
          <div className={styles.historyContainer}>
            {state.tasks.map((task) => (
              <div className={styles.content} key={task.id}>
                <TaskComponent task={task}></TaskComponent>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (state.isFiltered == true) {
    return (
      <main className={styles.main}>
        <div className={styles.body}>
          <div className={styles.bar}>
            <div className={styles.dropdown}>
              <Dropdown/>
            </div>
          </div>
          <div className={styles.historyContainer}>
            {state.filteredTasks.map((task) => (
              <div className={styles.content} key={task.id}>
                <TaskComponent task={task}></TaskComponent>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }
}
