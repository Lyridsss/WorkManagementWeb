import {useContext} from "react";
import {WorkspaceListHeaderContext} from "../context/WorkspaceListHeaderContextProvider.jsx";

export const useWorkspaceListHeaderUpdater  = () => {
    return useContext(WorkspaceListHeaderContext)
}