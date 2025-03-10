import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';
import UpdateTask from './components/UpdateTask';
import './App.css'; // Import the CSS file for styling

const App = () => {
    return (
        <Router>
            <div className="container">
                <header>
                    <h1>Welcome to the Task Manager</h1>
                </header>
                <Routes>
                    <Route path="/" element={<Navigate to="/create-task" />} />
                    <Route path="/create-task" element={<CreateTask />} />
                    <Route path="/task-list" element={<TaskList />} />
                    <Route path="/update-task/:id" element={<UpdateTask />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;