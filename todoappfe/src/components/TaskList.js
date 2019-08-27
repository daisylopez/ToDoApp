import React, { useState } from 'react';
import uuid from 'uuid/v4';
import { Link, Route } from 'react-router-dom';

import TaskListGroup from './TaskListGroup';

function TaskList() {
	let [tasks, setTasks] = useState([
		{id: uuid(), name: "eat", status: "Pending"},
		{id: uuid(), name: "code", status: "Ongoing"},
		{id: uuid(), name: "sleep", status: "Done"},
	]);

	if(tasks.length == 0) {
			fetch("http://localhost:8080/")
			.then( function(res) {
				return res.json();
			})
			.then( function(data) {
				console.log(data);
				setTasks (data);
			})
		}

	let pendingTasks = tasks.filter(task => task.status === "Pending");
	let ongoingTasks = tasks.filter(task => task.status === "Ongoing");
	let doneTasks = tasks.filter(task => task.status === "Done");

	let addTask = (taskName, status) => {
		let newTask = {
			id: uuid(),
			name: taskName,
			status
		}
		setTasks([...tasks, newTask]);
	}

	let setStatus = (id, status) => {
		let updatedTasks = tasks.map(task => {
			if(task.id === id) {
				task.status = status;
			}
			return task;
		});

		setTasks(updatedTasks);
	}

	let editTask = (id, taskName) => {
		let updatedTasks = tasks.map(task => {
			if(task.id === id) {
				task.name = taskName;
			}
			return task;
		});

		setTasks(updatedTasks);
	}

	let removeTask = (id) => {
		let updatedTasks = tasks.filter( task => {
			return task.id !== id;
		});

		setTasks(updatedTasks);
	}

	return(
		<React.Fragment>
			<nav className="navbar navbar-expand-sm bg-default justify-content-center">
				<ul className="navbar-nav">
				    <li className="nav-item">
				      <Link 
				      	className="nav-link" 
				      	to="/pending"
				      >
				      	Pending Tasks
				      </Link>
				    </li>
				    <li className="nav-item">
				      <Link 
				      	className="nav-link" 
				      	to="/ongoing"
				      >
				      	Ongoing Tasks
				      </Link>
				    </li>
				    <li className="nav-item">
				      <Link 
				      	className="nav-link" 
				      	to="/done"
				      >
				      	Done Tasks
				      </Link>
				    </li>
				  </ul>
			</nav>
			
			<Route 
				path="(/|/pending)"
				exact
				render= { (props) => 
					<TaskListGroup 
						{...props}
						tasks={pendingTasks} 
						setStatus={setStatus}
						addTask={addTask}
						editTask={editTask} 
						removeTask={removeTask} 
						color="warning"
					/>
				}
			/>
			
			<Route 
				path="/ongoing"
				exact
				render={ (props) => 
					<TaskListGroup
						{...props} 
						tasks={ongoingTasks} 
						setStatus={setStatus}
						addTask={addTask} 
						editTask={editTask} 
						removeTask={removeTask} 
						color="info"
					/>
				}
			/>
			
			<Route 
				path="/done"
				exact
				render={ (props) => 
					<TaskListGroup
						{...props} 
						tasks={doneTasks} 
						setStatus={setStatus}
						addTask={addTask} 
						editTask={editTask}
						removeTask={removeTask} 
						color="success"
					/>
				}
			/>
		</React.Fragment>
	);
}

export default TaskList;