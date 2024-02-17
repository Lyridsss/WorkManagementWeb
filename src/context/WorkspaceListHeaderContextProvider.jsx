import {createContext, useState} from "react";

export const WorkspaceListHeaderContext = createContext(null)

export const WorkspaceListHeaderContextProvider = ({ children }) => {
    const [workspaceListHeaderUpdate, setWorkspaceListHeaderUpdate] = useState(0)

    const workspaceListHeaderUpdater = () => {
        setWorkspaceListHeaderUpdate(prevState => prevState + 1)
    }

    return (
        <WorkspaceListHeaderContext.Provider value={[workspaceListHeaderUpdate, workspaceListHeaderUpdater]}>
            {children}
        </WorkspaceListHeaderContext.Provider>
    )
}