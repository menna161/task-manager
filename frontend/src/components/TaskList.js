import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, deleteTask } from '../services/taskService';
import './TaskList.css'; 
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; 

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await getTasks();
            setTasks(tasks);
        };
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
            setMessage('Task deleted successfully');
            setTimeout(() => {
                setMessage('');
            }, 10000); // Clear message after 10 seconds
        } catch (error) {
            setMessage('Failed to delete task');
            setTimeout(() => {
                setMessage('');
            }, 5000); // Clear message after 10 seconds
        }
    };

    const handleEdit = (task) => {
        navigate(`/update-task/${task.id}`, { state: { task } });
    };

    const handleCreate = () => {
        navigate('/create-task');
    };

    return (
        <div className="task-list-container">
            <h1>Task List</h1>
            <button className="create-button" onClick={handleCreate}>
                <FaPlus /> Create New Task
            </button>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id} className="task-item">
                            <td className="task-id">{task.id}</td>
                            <td className="task-title">{task.title}</td>
                            <td className="task-description">{task.description}</td>
                            <td className="task-due-date">{task.due_date}</td>
                            <td className="task-status">{task.status}</td>
                            <td className="task-actions">
                                <button className="edit-button" onClick={() => handleEdit(task)}>
                                    <FaEdit />
                                </button>
                                <button className="delete-button" onClick={() => handleDelete(task.id)}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default TaskList;