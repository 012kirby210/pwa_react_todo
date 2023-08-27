import TasksProvider from "./TasksProvider.jsx";
import AddTask from './AddTask.jsx';
import TaskList from './TaskList.jsx';


const TaskApp = () => {
    return (
      <TasksProvider>
          <header>

          </header>
          <main>
              <h1>Todo</h1>
              <AddTask />
              <TaskList />
          </main>
      </TasksProvider>
    );
}

export default TaskApp;

