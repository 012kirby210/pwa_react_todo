import { TasksContext, TasksDispatchContext } from "./TasksContext.jsx";
import { StorableContext } from "./indexeDB.jsx";
import ErrorsContext from "./ErrorsContext.jsx";
import {useContext, useReducer, useState} from "react";


function wrapPromise(promise) {
    let status = 'pending'
    let response

    const suspender = promise.then(
        (res) => {
            status = 'success'
            response = res
        },
        (err) => {
            status = 'error'
            response = err
        },
    )
    const read = () => {
        switch (status) {
            case 'pending':
                throw suspender
            case 'error':
                throw response
            default:
                return response
        }
    }

    return { read }
}

const resource = wrapPromise(
    new Promise( (resolve,reject) => {
        setTimeout( () => { resolve("promise has resolved");}, 2000);
    })
);

const TasksProvider = ( {children} ) => {

    const db = useContext(StorableContext);

    const enAttente = resource.read();

    const [ tasks, dispatch ] = useReducer( tasksReducer, [] )
    const [ error, setError ] = useState(null);

    const handleAddTask = async (text) => {
        try{
            const id = await db.tasks.add({text: text, done: false});
            dispatch({
                type: 'added',
                id: id,
                text: text
            });
        }catch (error){
            setError(error);
        }
        return [];
    }

    const handleChangeTask = async (id,text,done) => {
        try{
            await db.tasks.update(id, {text,done});
            dispatch({
                type: 'changed',
                task:{
                    id,text, done
                }
            });
        }catch (error){
            setError(error);
        }
    }

    const handleRemoveTask = async (id) => {
        try {
            await db.tasks.delete(id);
            dispatch({
                type: 'deleted',
                id
            });
        }catch (error){
            setError(error);
        }
    }

    // charge les données depuis le storage :

    return (
        <ErrorsContext.Provider value={error} >
            <TasksContext.Provider value={tasks}>
                <TasksDispatchContext.Provider value={{handleAddTask, handleChangeTask, handleRemoveTask}}>
                    {children}
                </TasksDispatchContext.Provider>
            </TasksContext.Provider>
        </ErrorsContext.Provider>
    );
}

const tasksReducer = (tasks,action) => {
    switch (action.type) {
        case 'added': {
            // ajoute à la base aussi :
            return [...tasks, {
                id: action.id,
                text: action.text,
                done: false
            }];
        }
        case 'changed': {
            return tasks.map(t => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return tasks.filter(t => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const initialTasks = [];
// const initialTasks = [
//     { id: 0, text: 'Philosopher’s Path', done: true },
//     { id: 1, text: 'Visit the temple', done: false },
//     { id: 2, text: 'Drink matcha', done: false }
// ];

export default TasksProvider;