'use client'

import styles from './page.module.css'
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import CustomButtonComponent from './components/customButtonComponent';
import { useEffect, useState } from 'react';
import { getProcessInstanzess } from './components/startsprocess';
import LogoutButton from './logoutbutton';

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

  const columnDefs = [
    {
      headerName: 'Task',
      children: [
            { field: 'description', flex: 2 },
            { field: 'category', flex: 2 },
            { field: 'options', cellRenderer: CustomButtonComponent.bind(this), flex: 1 }
      ],
    },
  ]

  return ( 
    <main className={styles.main}>
      <div className={styles.body}>
        <LogoutButton></LogoutButton>
        <div className={styles.taskContainer}>
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
      </div>
    </main>
  )
}
