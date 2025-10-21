'use client';

import { NodeToolbar, Position } from "@xyflow/react";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { DeleteIcon, SettingsIcon } from "lucide-react";


interface WorkflowNodeProps {
    children : ReactNode;
    showToolbar?: boolean;
    onDelete?: ()=> void;
    onSetting?: ()=> void;
    name?: string;
    description?: string;
}

export function WorkflowNode( { children, showToolbar, onDelete, onSetting, name, description } : WorkflowNodeProps ){
    return (
        <>
            {showToolbar && (
                <NodeToolbar>
                    <Button size={"sm"} variant={"ghost"} onClick={onSetting}>
                        <SettingsIcon className="size-4"/>
                    </Button>
                    <Button size={"sm"} variant={"ghost"} onClick={onDelete}>
                        <DeleteIcon className="size-4"/>
                    </Button>
                </NodeToolbar>
            )}
            {children}
            {name && (
                <NodeToolbar
                position={Position.Bottom}
                isVisible
                className="max-w-[200px] text-center"
                >
                    <p className="font-medium">{name}</p>
                    {description && (
                        <p className="text-muted-foreground truncate text-sm">{description}</p>
                    )}
                </NodeToolbar>
            )}
        </>
    )
}