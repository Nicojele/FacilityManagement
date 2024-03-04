'use client'

import styles from './page.module.css'
import { useEffect, useState } from 'react'
import TaskComponent from './components/taskComponent'
import CreateTaskForm from './components/startProcessForm'
import { getProcessInstanzess, navigateToDetailView } from './components/startsprocess'
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import CustomButtonComponent from './components/customButtonComponent'

interface TaskToolState {
  tasks: any[]
  isLoading: boolean
}

export default function Home() {
  const [state, setState] = useState<TaskToolState>({
    tasks: [],
    isLoading: true
  });


  useEffect(() => {
    async function fetchData() {
      const instanzess = []
      const processInstanzes = getProcessInstanzess();
      (await processInstanzes).processInstances.forEach((instanz) => {
        if (instanz.state == "running") {
          instanzess.push({
            description: instanz.startToken.payload.description, category: instanz.startToken.payload.category, finished: false, processInstanzeId: instanz.processInstanceId
          })
        }
      });
      setState({ tasks: instanzess, isLoading: false })
    }
    fetchData();
  }, [])

  const colDef = [
    {
      field: "description",
      flex: 2,
      headerClass: 'centered-header', // Specify the class for centering
    },
    {
      field: "category",
      flex: 2,
      headerClass: 'centered-header', // Specify the class for centering
    },
    {
      field: "button",
      headerClass: 'centered-header', // Specify the class for centering
      cellRenderer: CustomButtonComponent.bind(this)
    },
  ]

  const wichtigeDringendeTaks: Array<any> = [];
  const wichtigeTaks: Array<any> = [];
  const dringendeTasks: Array<any> = [];
  const unwichtigeTasks: Array<any> = [];

  state.tasks.forEach((task) => {
    if (task.category == "Wichtig & Dringend") {
      wichtigeDringendeTaks.push(task);
    }
    if (task.category == "Wichtig") {
      wichtigeTaks.push(task);
    }
    if (task.category == "Dringend") {
      dringendeTasks.push(task);
    }
    if (task.category == "Nicht Wichtig & Nicht Dringend") {
      unwichtigeTasks.push(task);
    }
  })

  if (state.isLoading) return ( 
    <main className={styles.main}>
      <div className={styles.body}>
        <div className={styles.loader} />
      </div>
    </main>
  )
  else return (
    <main className={styles.main}>
      <div className={styles.createTaskContainer}>
        <CreateTaskForm />
      </div>
      <div className={styles.grid}>
        <div
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
          wichtig & dringend
          </h2>
          <div className={styles.taskContainer}>
            <div className="ag-theme-quartz" style={{ height: '95%', width: '100%'}}>
              <AgGridReact
                rowData={wichtigeDringendeTaks}
                columnDefs={colDef}
                onGridReady={params => {
                  params.api.sizeColumnsToFit();
                }}
              />
            </div>
          </div>
        </div>

        <div
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
          wichtig & nicht dringend
          </h2>
            <div className={styles.taskContainer}>
              <div className="ag-theme-quartz" style={{ height: '95%', width: '100%'}}>
                <AgGridReact
                  rowData={wichtigeTaks}
                  columnDefs={colDef}
                  onGridReady={params => {
                    params.api.sizeColumnsToFit();
                  }}
                />
            </div>
          </div>
        </div>

        <div
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
          nicht wichtig & dringend
          </h2>
            <div className={styles.taskContainer}>
              <div className="ag-theme-quartz" style={{ height: '95%', width: '100%'}}>
                <AgGridReact
                  rowData={dringendeTasks}
                  columnDefs={colDef}
                  onGridReady={params => {
                    params.api.sizeColumnsToFit();
                  }}
                />
            </div>
          </div>
        </div>

        <div
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
          nicht wichtig & nicht dringend
          </h2>
            <div className={styles.taskContainer}>
              <div className="ag-theme-quartz" style={{ height: '95%', width: '100%'}}>
                <AgGridReact
                  rowData={unwichtigeTasks}
                  columnDefs={colDef}
                  onGridReady={params => {
                    params.api.sizeColumnsToFit();
                  }}
                />
            </div>
          </div>
        </div>
      </div>
    </main>   
  )
}
