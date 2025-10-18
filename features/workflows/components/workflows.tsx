'use client'

import { EntityContainer, EntityHeader } from "@/components/entity-components";
import { useCreateWorkflow, useSuspenseHook } from "../hooks/use-workflows"
import { useUpgradeModal } from "@/hooks/useUpgradeModal";

export const WorkflowsList=()=>{

    const workflows = useSuspenseHook();

    return (
        <div className="flex-1 flex justify-center items-center">
            <p>
                {JSON.stringify(workflows.data, null, 2)}
            </p>
        </div>
    )
}

export const WorkFlowsHeader=({disabled}:{disabled?: boolean})=>{

    const createWorkflow = useCreateWorkflow();
    const { handleError, modal } = useUpgradeModal();

    const handleCreate=()=>{
        createWorkflow.mutate(undefined, {
            onError : (Error)=>{
               handleError(Error);
            }
        })
    }

    return (
        <>
        {modal}
            <EntityHeader 
                title="workflows"
                description="create and manage the workflows"
                newButtonlabel="New Workflow"
                onNew={handleCreate}
                disabled={disabled}
                isCreating={createWorkflow.isPending}
            />
        </>
    )
}

export const WorkflowContainer=({children}:{children : React.ReactNode})=>{
    
    return (
        <EntityContainer
        header={<WorkFlowsHeader/>}
        search={<></>}
        pagination={<>[]</>}
        >
            {children}
        </EntityContainer>
    )
}