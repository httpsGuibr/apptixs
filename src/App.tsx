import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">AppTixs todo-list</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;