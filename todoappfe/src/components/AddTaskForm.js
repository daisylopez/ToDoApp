import React, { useState } from 'react';

function AddTaskForm(props) {
	let url = props.history.location.pathname;
	let [textInputError, setTextInputError] = useState("");
	let [newTask, setNewTask] = useState("");

	let taskInputChangeHandler = (e) => {
		setNewTask(e.target.value);
	}

	let addBtnClickHandler = () => {

		

		let temp = {
			name: newTask
		}
		fetch("http://localhost:8080/task", {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(temp)
		});
		props.addTask(temp);

		if(newTask.trim() === "") {
			return setTextInputError("Please fill out this field.");
		}

		setNewTask("");
		setTextInputError("");

		props.addTask(newTask, url.charAt(1).toUpperCase()+url.substring(2));
	}

	return(
		<form className="text-center mt-5 col-8 offset-2">
			<div className="form-group">
				<label htmlFor="taskInput">
					New {url.charAt(1).toUpperCase()+url.substring(2)} Task:
				</label>
				<input 
					id="taskInput" 
					type="text"
					value={newTask}
					className="form-control"
					onChange={taskInputChangeHandler} 
				/>
				<small className="text-danger">{textInputError}</small>
			</div>
			<button type="button"
				style={ {width: "100%"} } 
				className="btn btn-primary"
				onClick={addBtnClickHandler}
			>
				Add Task
			</button>
		</form>
	);
}

export default AddTaskForm;
