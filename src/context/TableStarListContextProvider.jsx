import {createContext, useState} from "react";

export const TableStarListContext = createContext(null)

export const TableStarListContextProvider = ({ children }) => {
    const [tableStarListCount, setTableStarListCount] = useState(0)
    const updateTableStarListCount = () => {
        setTableStarListCount(prevState => prevState + 1)
    }
    const context = {
        tableStarListCount,
        updateTableStarListCount
    }
    return (
        <TableStarListContext.Provider value={context}>
            {children}
        </TableStarListContext.Provider>
    )
}