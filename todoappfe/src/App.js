import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import TaskList from './components/TaskList';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App container-fluid">
        <div className="row">
          <div className="col-12 col-md-6 offset-md-3">
            <TaskList />  
          </div>
        </div>
      </div>
  </BrowserRouter>
  );
}

export default App;
