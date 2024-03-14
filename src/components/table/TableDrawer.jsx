import {Link} from "react-router-dom";
import {useState} from "react";
import TableDrawerOptions from "./TableDrawerOptions.jsx";
import TableDrawerDetails from "./TableDrawerDetails.jsx";

export default function TableDrawer({ table }){
    const views = {
        home: "HOME",
        info: "INFO",
        activity: "ACTIVITY",
        background: "BACKGROUND"
    }
    const [display, setDisplay] = useState(views.home)
    return (
        <div className="flex items-center">
            <div className="drawer drawer-end">
                <input id="table-home-drawer" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content">
                    <label htmlFor="table-home-drawer" className="drawer-button hover:cursor-pointer text-lg ml-2 hover:text-primary hover:bg-gray-300 px-2 py-1 rounded-md">
                        <i className="fa-solid fa-ellipsis"></i>
                    </label>
                </div>
                <div className="drawer-side z-50 top-[68px]">
                    <label
                        htmlFor="table-home-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                        onClick={() => setDisplay(views.home)}
                    ></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {display === "HOME" && <TableDrawerOptions table={table} options={views} setDisplay={setDisplay}/>}
                        {display === "INFO" && <TableDrawerDetails table={table} />}
                        {display === "ACTIVITY" && <div>Activity</div>}
                        {display === "BACKGROUND" && <div>Background</div>}
                    </ul>
                </div>
            </div>
        </div>
    )
}