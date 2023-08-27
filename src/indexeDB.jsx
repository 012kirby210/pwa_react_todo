import { createContext} from "react";
import Dexie from "dexie";

const StorableContext = createContext(null);

const StorableProvider = ({children}) => {

    const db = new Dexie('MyTodoDatabase');

    db.version(1).stores({
        tasks: '++id,text,done'
    });

    return (
        <StorableContext.Provider value={db}>
            {children}
        </StorableContext.Provider>
    )
}

export { StorableProvider, StorableContext };