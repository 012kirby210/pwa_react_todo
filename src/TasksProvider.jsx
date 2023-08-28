import { TasksDispatchContext } from "./TasksContext.jsx";
import { StorableContext } from "./indexeDB.jsx";
import ErrorsContext from "./ErrorsContext.jsx";
import {useContext, useState} from "react";

const TasksProvider = ( {children} ) => {

    const db = useContext(StorableContext);

    const [ error, setError ] = useState(null);

    const handleAddTask = async (text) => {
        try{
            const id = await db.tasks.add({text: text, done: false});
        }catch (error){
            setError(error);
        }
        return [];
    }

    const handleChangeTask = async (id,text,done) => {
        try{
            await db.tasks.update(id, {text,done});
        }catch (error){
            setError(error);
        }
    }

    const handleRemoveTask = async (id) => {
        try {
            await db.tasks.delete(id);
        }catch (error){
            setError(error);
        }
    }

    // charge les données depuis le storage :

    return (
        <ErrorsContext.Provider value={error} >
            <TasksDispatchContext.Provider value={{handleAddTask, handleChangeTask, handleRemoveTask}}>
                {children}
            </TasksDispatchContext.Provider>
        </ErrorsContext.Provider>
    );
}

export default TasksProvider;