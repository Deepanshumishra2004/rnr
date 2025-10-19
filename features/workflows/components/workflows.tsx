'use client'

import { EntityContainer, EntityHeader, EntityPagination, EntitySearch } from "@/components/entity-components";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows"
import { useUpgradeModal } from "@/hooks/useUpgradeModal";
import { useRouter } from "next/navigation";
import { useWorkflowParams } from "../hooks/use-workflow-params";
import { UseEntitySearch } from "@/hooks/use-Entity-Search";

export const WorkflowPangination=()=>{
    const workflow = useSuspenseWorkflows();
    const [params,setParams]= useWorkflowParams();

    return (
        <EntityPagination
        disabled={workflow.isFetching}
        totalPages={workflow.data.totalPages}
        page={workflow.data.page}
        onPageChange={(page)=>setParams({...params,page})}
        />
    )
}

export const WorkflowSearch=()=>{

    const [params, setParams]= useWorkflowParams();
    const { searchValue, onSearchChange } = UseEntitySearch({
        params,
        setParams,
      });
          return (
        <EntitySearch
        value={searchValue}
        onChange={onSearchChange}
        placeholder="seach workflows"
        />
    )
}

export const WorkflowsList=()=>{

    const workflows = useSuspenseWorkflows();

    return (
        <div className="flex-1 flex justify-center items-center">
            <p>
                {JSON.stringify(workflows.data, null, 2)}
            </p>
        </div>
    )
}

export const WorkFlowsHeader=({disabled}:{disabled?: boolean})=>{

    const router = useRouter();

    const createWorkflow = useCreateWorkflow();
    const { handleError, modal } = useUpgradeModal();

    const handleCreate=()=>{
        createWorkflow.mutate(undefined, {
            onSuccess : (data)=>{
                // router.push(`workflow/${data.id}`)
            },
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
        search={<WorkflowSearch/>}
        pagination={<WorkflowPangination/>}
        >
            {children}
        </EntityContainer>
    )
}

