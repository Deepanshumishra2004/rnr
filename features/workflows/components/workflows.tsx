'use client'

import { EmptyView, EntityContainer, EntityHeader, EntityItem, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/entity-components";
import { useCreateWorkflow, useRemoveWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows"
import { useUpgradeModal } from "@/hooks/useUpgradeModal";
import { useRouter } from "next/navigation";
import { useWorkflowParams } from "../hooks/use-workflow-params";
import { UseEntitySearch } from "@/hooks/use-Entity-Search";
import type { Workflow } from "@prisma/client";
import { WorkflowIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const WorkflowPagination = () => {
    const workflow = useSuspenseWorkflows();
    const [params, setParams] = useWorkflowParams();

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
        <EntityList 
        items={workflows.data.items} 
        renderItems={(workflows)=> <WorkflowItem data={workflows}/>} 
        getKey={(workflow)=> workflow.id}  
        emptyView={<EmptyWorkflow/>} 
        className=""
        />
    )
}

export const WorkFlowsHeader=({disabled}:{disabled?: boolean})=>{

    const router = useRouter();

    const createWorkflow = useCreateWorkflow();
    const { handleError, modal } = useUpgradeModal();

    const handleCreate=()=>{
        createWorkflow.mutate(undefined, {
            onSuccess : (data)=>{
                router.push(`workflows/${data.id}`)
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
        pagination={<WorkflowPagination/>}
        >
            {children}
        </EntityContainer>
    )
}

export const WorkflowLoading=()=>{
    return <LoadingView message="Loading Workflows....." />
}

export const WorkflowError=()=>{
    return <ErrorView message="Error Loading Workflows"/>
}

export const EmptyWorkflow=()=>{

    const createWorkflow = useCreateWorkflow();
    const { handleError, modal } = useUpgradeModal();

    const handleCreate=()=>{
        createWorkflow.mutate(undefined, {
            onError : (error)=>{
                handleError(error)
            }
        })
    }

    return (
        <div className="h-full flex justify-center items-center border bg-background">
            {modal}
            <EmptyView 
            message="You haven't created any workflows yet. Get started by created your first workflow" 
            onNew={()=>{handleCreate}}
            />
        </div>
    )
}


export const WorkflowItem=({data}:{data : Workflow})=>{

    const removeWorkflow = useRemoveWorkflow();

    const handleRemove=()=>{
        removeWorkflow.mutate({ id : data.id })
    }

    return (
        <EntityItem
        href={`workflows/${data.id}`}
        title={data.name}
        subtitle={
        <>
        updated TODO {formatDistanceToNow(data.updatedAt, {addSuffix : true})}{" "}
        &bull; Created{" "}
        {formatDistanceToNow(data.createdAt, {addSuffix : true})}
        </>
        }
        image={
            <div className="size-8 flex items-center justify-center">
                <WorkflowIcon className="size-5 text-muted-foreground" />
            </div>
        }
        onRemove={handleRemove}
        isRemoving={removeWorkflow.isPending}
        />
    )
}