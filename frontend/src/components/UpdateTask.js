import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { updateTask } from '../services/taskService';
import './UpdateTask.css'; // Import the CSS file

const UpdateTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { task } = location.state;

    const [taskDetails, setTaskDetails] = useState({
        title: '',
        description: '',
        due_date: '',
        status: ''
    });

    useEffect(() => {
        if (task) {
            setTaskDetails(task);
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails({ ...taskDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateTask(id, taskDetails);
        navigate('/task-list');
    };

    return (
        <div className="update-task-container">
            <h1>Update Task</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={taskDetails.title}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={taskDetails.description}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="due_date">Due Date</label>
                <input
                    type="date"
                    id="due_date"
                    name="due_date"
                    value={taskDetails.due_date}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    name="status"
                    value={taskDetails.status}
                    onChange={handleChange}
                    required
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <button type="submit">Update Task</button>
            </form>
        </div>
    );
};

export default UpdateTask;