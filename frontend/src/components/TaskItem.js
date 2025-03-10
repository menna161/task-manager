import React from 'react';
import PropTypes from 'prop-types';
import './TaskItem.css'; // Import the CSS file

const TaskItem = ({ title, description, dueDate, status }) => {
    return (
        <div className="task-item">
            <div className="task-row">
                <div className="task-cell task-title">{title}</div>
                <div className="task-cell task-description">{description}</div>
                <div className="task-cell task-due-date">{dueDate}</div>
                <div className="task-cell task-status">{status}</div>
            </div>
        </div>
    );
};

TaskItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
};

export default TaskItem;