'use client';
import styles from "./history.module.css";
import TaskComponent from "../components/taskComponent";
import { useEffect, useState } from "react";
import { Button } from "@blueprintjs/core";
import { getReviewFinishProcessInstanzess } from "../components/startsprocess";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { Task } from "../components/task";
import HistoryButtonComponent from "../components/historyButtonComponent";

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

  const columnDefs = [
    {
      headerName: 'Task',
      children: [
        {
          field: 'description', flex: 2,
          filter: true,
          getQuickFilterText: params => {
            return params.value.name;
          },
        },
        {
          field: 'category', flex: 2,
          filter: true,
          getQuickFilterText: params => {
            return params.value.name;
          },
        },
        {
          field: 'options',
          cellRenderer: HistoryButtonComponent.bind(this)
        }
      ],
    },
  ]

  useEffect(() => {
    async function fetchData() {
      const instanzess = []
      const processInstanzes = getReviewFinishProcessInstanzess();
      (await processInstanzes).processInstances.forEach((instanz) => {
        if (instanz.state == "finished") {
          const task = new Task(instanz.startToken.payload.description, instanz.startToken.payload.category, instanz.processInstanceId, instanz.startToken.payload.date, true);
          instanzess.push(task)
        }
      });
      setState({ tasks: instanzess, filteredTasks: state.filteredTasks, isFiltered: state.isFiltered, isLoading: false })
    }
    fetchData();
  }, [])

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
          <div className="ag-theme-quartz" style={{ height: '95%', width: '100% '}}>
                <AgGridReact
                  rowData={state.tasks}
                  columnDefs={columnDefs}
                  onGridReady={params => {
                    params.api.sizeColumnsToFit();
                  }}
                />
            </div>
        </div>
      </main>
    );
  }
}
