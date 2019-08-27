import React from 'react'

const UserTable = props => (


  <table>
    <thead>
      <tr>
        <th></th>
        <th>Tasks</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    	{props.tasks.length > 0 ? (
	    	props.tasks.map(task => (
		   		<tr key = {task.id}>
			        <td></td>
			        <td>{task.name}</td>
			        <td>
			        	<button
							onClick={() => {
							props.editRow(task)
							}}
							className="button muted-button"
						>
						  Edit
						</button>
			          	
			          	<button 
				          	onClick={() => props.deleteTask(task.id)} 
				          	className="button muted-button">
						  Delete
						</button>
		        	</td>
		      	</tr>
	      	))
    	) : (
    	<tr>
          <td colSpan={3}>No tasks to display</td>
        </tr>
      	)
    }
    </tbody>
  </table>
)

export default UserTable