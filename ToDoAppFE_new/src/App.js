import React, { useState, Fragment  } from 'react'
import TaskTable from './components/TaskTable.js'
import AddTaskForm from './components/AddTaskForm.js'
import EditTaskForm from './components/EditTaskForm.js'

const App = () => {
  const tasksData = [
    // { id: 1, name: 'eat' },
    // { id: 2, name: 'code' },
    // { id: 3, name: 'sleep' },
  ]
  const initialFormState = { id: null, name: '' }

  // Setting state
  const [tasks, setTasks] = useState(tasksData)
  const [currentTask, setCurrentTask] = useState(initialFormState)
  const [editing, setEditing] = useState(false)

   // Display data from backend
  if(tasks.length === 0) {
      fetch("http://localhost:8080/")
      .then( function(res) {
        return res.json(); // JSON transmits data between web app and server
      })
      .then( function(data) {
        console.log(data);
        setTasks (data);
      })
    }

  // CRUD operations
  const addTask = task => {
    task.id = tasks.length + 1
    setTasks([...tasks, task])
  }

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const updateTask = (id, updateTask) => {
    setEditing(false)
    setTasks(tasks.map(task => (task.id === id ? updateTask : task)))
  }

  const editRow = task => {
  setEditing(true)
  setCurrentTask({ id: task.id, name: task.name})
  }



  return (
    <div className="container">
      <h1>To-Do App</h1>
      <div className="flex-row">

              <div className="flex-large">
              {editing ? (
                <Fragment>
                  <h2>Edit Task</h2>
                  <EditTaskForm
                    editing={editing}
                    setEditing={setEditing}
                    currentTask={currentTask}
                    updateTask={updateTask}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  <h2>Add Tasks</h2>
                  <AddTaskForm addTask={addTask} />
                </Fragment>
              )}
            </div>
        <div className="flex-large">
          <h2>View Tasks</h2>
          <TaskTable tasks={tasks} deleteTask={deleteTask} editRow={editRow}/>
        </div>
      </div>
    </div>
  )
}

export default App