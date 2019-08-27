import React from 'react';

import TaskListItem from './TaskListItem';
import AddTaskForm from './AddTaskForm';

function TaskListGroup(props) {
	let displayTasks = () => {
		return props.tasks.map( task => {
			return <TaskListItem 
					key={task.id} 
					task={task}
					color={props.color} 
					setStatus={props.setStatus}
					editTask={props.editTask}
					removeTask={props.removeTask}
					/>
		});
	}

	let textColor = "text-"+props.color;

	let icon;
	let text;
	switch(props.color) {
		case "warning":
			icon = <i className="fas fa-ellipsis-h"></i>;
			text = " Pending Tasks";
			break;
		case "info":
			icon = <i className="far fa-clock"></i>;
			text = " Ongoing Tasks";
			break;
		case "success":
			icon = <i className="far fa-check-circle"></i>;
			text = " Done Tasks";
			break;
		default: break;
	}

	let displayListGroup = () => {
		return props.tasks.length>0 ? 
			(
				<React.Fragment>
					<h2 className={textColor}>
						{icon}
						{text}
					</h2>
					<div className="list-group">
						{ displayTasks() }
					</div>
				</React.Fragment>
			) :
			(
				<div className="jumbotron text-center">
					<h2>No {text}</h2>
				</div>
			)
		
	}

	return(
		<div className="mt-5">
			<AddTaskForm {...props} addTask={props.addTask} />
			<div className="mt-5">
				{ displayListGroup() }
			</div>
		</div>
	);
}

export default TaskListGroup;