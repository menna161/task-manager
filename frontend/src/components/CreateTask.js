import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../services/taskService';
import './CreateTask.css'; // Import the CSS file

const CreateTask = () => {
    const [task, setTask] = useState({ title: '', description: '', due_date: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createTask(task);
        navigate('/task-list');
    };

    return (
        <div className="create-task-container">
            <h1>Create Task</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="due_date">Due Date</label>
                    <input
                        type="date"
                        id="due_date"
                        name="due_date"
                        value={task.due_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="create-button">Create Task</button>
            </form>
        </div>
    );
};

export default CreateTask;