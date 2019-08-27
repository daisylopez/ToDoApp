import React, { useState, useRef } from 'react';

function TaskListItem(props) {
	let taskInput = useRef(null);
	let [task, setTask] = useState(props.task.name);
	let [edit, setEdit] = useState(false);

	let circle = {
		borderRadius: "16px"
	}

	let taskSubmit = (event) => {
		if(event.key === "Enter") {
			props.editTask(props.task.id, event.target.value);
			setEdit(false);
		}
	}

	let inputChangeHandler = (e) => {
		setTask(e.target.value);
	}

	let editHandler = () => {
		setEdit(true);
	}

	let showEditInput = () => {
		if(!edit) {
			return(
				<i className="fas fa-pencil-alt"
					onClick={ editHandler }
				>
					&nbsp;{ props.task.name }
				</i>
			);
		} else {
			return(
				<input
					ref={taskInput} 
					onKeyPress={taskSubmit}
					onChange={inputChangeHandler} 
					type="text" 
					value={task}
				/>
			);
		}
	}

	let displayButtons = () => {
		switch(props.color) {
			case "warning":
				return(
					<React.Fragment>
					<button
						onClick={() => props.setStatus(props.task.id, "Done") }
						className="btn btn-sm btn-success float-right" style={circle}>
						<i className="far fa-check-circle"></i>
					</button>
					<button 
						onClick={()=>props.setStatus(props.task.id, "Ongoing")}
						className="btn btn-sm btn-info float-right" style={circle}>
						<i className="far fa-clock"></i>
					</button>
					</React.Fragment>
				);
			case "info":
				return(
				<React.Fragment>
					<button
						onClick={() => props.setStatus(props.task.id, "Done") }
						className="btn btn-sm btn-success float-right" style={circle}>
						<i className="far fa-check-circle"></i>
					</button>
					<button 
						onClick={()=>props.setStatus(props.task.id, "Pending")}
						className="btn btn-sm btn-warning float-right" style={circle}>
						<i className="fas fa-ellipsis-h"></i>
					</button>
					</React.Fragment>
				);
			case "success":
				return(
					<React.Fragment>
					<button 
						onClick={()=>props.setStatus(props.task.id, "Ongoing")}
						className="btn btn-sm btn-info float-right" style={circle}>
						<i className="far fa-clock"></i>
					</button>
					<button 
						onClick={()=>props.setStatus(props.task.id, "Pending")}
						className="btn btn-sm btn-warning float-right" style={circle}>
						<i className="fas fa-ellipsis-h"></i>
					</button>
					</React.Fragment>
				);
			default: break;
		}
	}

	let listGroupColor = "text-center list-group-item list-group-item-"+props.color
	return(
		<div className={listGroupColor}>
			<i onClick={() => props.removeTask(props.task.id)}className="far fa-trash-alt float-left btn btn-danger" style={circle}></i>
			{ showEditInput() }
			{ displayButtons() }
		</div>
	);
}

export default TaskListItem;