import React, { useState } from 'react'

const AddTaskForm = props => {
	const initialFormState = { id: null, name: '' }
const [tasks, setTask] = useState(initialFormState)
const handleInputChange = event => {
  const { name, value } = event.target

  setTask({ ...tasks, [name] : value })
}

let addBtnClickHandler = () => {
    let temp = {
      name: tasks.name
    }
    fetch("http://localhost:8080/task", {
      method: 'post',
        headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(temp)
    });
    props.addTask(temp);
  }

  return (
    <form
    	onSubmit={event => {
        event.preventDefault()
        if (!tasks.name) return
        // props.addTask(tasks)
        setTask(initialFormState)
      }}
     >
      <label>Task</label>
      <input type="text" name="name" value={tasks.name} onChange={handleInputChange}/>
      <button onClick={addBtnClickHandler}>Add</button>
    </form>
  )
}


export default AddTaskForm