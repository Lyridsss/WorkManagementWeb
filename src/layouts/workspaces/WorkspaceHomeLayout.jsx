import {useOutletContext} from "react-router-dom";
import WorkspaceHomeComponent from "../../components/workspace/WorkspaceHomeComponent.jsx";

export default function WorkspaceHomeLayout(){
    const [data, isPending, isError, update] = useOutletContext()
    return (
        <>
            <WorkspaceHomeComponent workspaceId={data?.id}/>
        </>
    )
}