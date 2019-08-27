import React, { useState } from 'react'

const EditTaskForm = props => {
const [tasks, setTask] = useState(props.currentTask)
const handleInputChange = event => {
  const { name, value } = event.target

  setTask({ ...tasks, [name] : value })
}

  return (
    <form
    	onSubmit={event => {
        event.preventDefault()
        props.updateTask(tasks.id, tasks)
      }}
     >
      <label>Task</label>
      <input type="text" name="name" value={tasks.name} onChange={handleInputChange}/>
      <button>Update Task</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}


export default EditTaskForm