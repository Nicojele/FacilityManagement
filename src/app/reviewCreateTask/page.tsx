'use client';
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { getReviewCreateProcessInstanzess } from "../components/startsprocess";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import ReviewCreateTaskButtonComponent from "../components/reviewCreateTaskButtonComponent";
import { Task } from "../components/task";

interface TaskToolState {
  tasks: Task[]
  isLoading: boolean
}

export default function ShowOrderView() {
  const [state, setState] = useState<TaskToolState>({
    tasks: [],
    isLoading: true
  });

  const session = useSession();

  useEffect(() => {
    async function fetchData() {
      const instanzess = [];
      const testProcessIntanzes = getReviewCreateProcessInstanzess();
      (await testProcessIntanzes).processInstances.forEach((instanz) => {
        if (instanz.state == "running") {
          const task = new Task(instanz.startToken.payload.description, instanz.startToken.payload.category, instanz.processInstanceId, instanz.startToken.payload.date, false);
          instanzess.push(task);
        }
      });
      setState({ tasks: instanzess, isLoading: false })
    }
    fetchData();
  }, [])

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
          cellRenderer: ReviewCreateTaskButtonComponent.bind(this)
        }
      ],
    },
  ]

  if (session.status == "authenticated" && session.data?.user?.claims["canReadAdminContent"]) {
    if (state.tasks.length == 0) {
      return (
      <>
        <div className={styles.body}>
            <div className={styles.messageContainer}>
              <a className={styles.errorMessage}>Zurzeit gibt es keine Aufträge.</a>
            </div>
        </div>
        </>
      )
    }
    else {
      return (
        <>
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
        </>
      )
    }
  }
}
