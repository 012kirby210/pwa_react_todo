import TasksProvider from "./TasksProvider.jsx";
import AddTask from './AddTask.jsx';
import TaskList from './TaskList.jsx';
import {StorableProvider} from "./indexeDB.jsx";
import ErrorsDisplay from "./ErrorsDisplay.jsx";
import {Suspense} from "react";


const TaskApp = () => {
    return (
        <StorableProvider>
            <TasksProvider>
                <header>

                </header>
                <main>
                    <h1>Todo</h1>
                    <ErrorsDisplay />
                    <AddTask />
                    <TaskList />
                </main>
            </TasksProvider>
        </StorableProvider>
    );
}

export default TaskApp;

