import { useState, useContext } from 'react';
import { TasksContext, TasksDispatchContext } from './TasksContext.jsx';

const TaskList = () => {
    const tasks = useContext(TasksContext);
    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <Task task={task} />
                </li>
            ))}
        </ul>
    );
}

const Task = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { handleChangeTask, handleRemoveTask } = useContext(TasksDispatchContext)
    // const dispatch = useContext(TasksDispatchContext);
    let taskContent;
    if (isEditing) {
        taskContent = (
            <>
                <input
                    type="text"
                    value={task.text}
                    onChange={e => {
                        const nTask = { ...task,
                            text: e.target.value};
                        handleChangeTask(nTask.id,nTask.text,nTask.done);
                    }} />
                <button onClick={() => setIsEditing(false)}>
                    Save
                </button>
            </>
        );
    } else {
        taskContent = (
            <>
                <span>{task.text}</span>
                <button onClick={() => setIsEditing(true)}>
                    Edit
                </button>
            </>
        );
    }
    return (
        <label>
            <input
                type="checkbox"
                checked={task.done}
                onChange={e => {
                    const nTask = { ...task,
                        done: e.target.checked};
                    handleChangeTask(nTask.id,nTask.text,nTask.done);
                }}
            />
            {taskContent}
            <button onClick={() => {
                handleRemoveTask(task.id);
            }}>
                Delete
            </button>
        </label>
    );
}

export default TaskList;