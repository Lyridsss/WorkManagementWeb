import {useState} from "react";
import TableDrawerOptions from "./TableDrawerOptions.jsx";
import TableDrawerDetails from "./TableDrawerDetails.jsx";
import TableActivity from "./TableActivity.jsx";
import TableDrawerBackground from "./TableDrawerBackground.jsx";

export default function TableDrawer({ table, update }){
    const views = {
        home: "HOME",
        info: "INFO",
        background: "BACKGROUND"
    }
    const [display, setDisplay] = useState(views.home)
    return (
        <div className="drawer drawer-end">
            <input id="table-home-drawer" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content">
                <label htmlFor="table-home-drawer" className="drawer-button hover:cursor-pointer flex text-lg hover:text-primary px-2 py-1 rounded-md">
                    <i className="fa-solid fa-ellipsis"></i>
                </label>
            </div>
            <div className="drawer-side z-50 w-screen mt-[64px]">
                <label
                    htmlFor="table-home-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                    onClick={() => setDisplay(views.home)}
                ></label>
                <ul className="p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {display === "HOME" && <TableDrawerOptions table={table} options={views} setDisplay={setDisplay}/>}
                    {display === "INFO" && <TableDrawerDetails table={table} options={views} setDisplay={setDisplay}/>}
                    {display === "BACKGROUND" && <TableDrawerBackground table={table} options={views} setDisplay={setDisplay} update={update}/>}
                </ul>
            </div>
        </div>
    )
}