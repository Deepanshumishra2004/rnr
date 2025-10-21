'use clients';

import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import { PlaceholderNode } from "./react-flow/placeholder-node";
import { PlusIcon } from "lucide-react";
import { WorkflowNode } from "./workflow-node";


export const InitalNode=memo((props : NodeProps)=>{
    return (
        <WorkflowNode showToolbar={true} name="Workflow Node" description="click to create Node">
            <PlaceholderNode>
                <div className="cursor-pointer flex justify-center items-center">
                    <PlusIcon className="size-4"/>
                </div>
            </PlaceholderNode>
        </WorkflowNode>
    )
})