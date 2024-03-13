import {useContext} from "react";
import {TableStarListContext} from "../context/TableStarListContextProvider.jsx";

export const useTableStarListUpdater = () => {
    return useContext(TableStarListContext)
}