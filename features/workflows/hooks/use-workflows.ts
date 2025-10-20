import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWorkflowParams } from "./use-workflow-params";

export const useSuspenseWorkflows=()=>{
    const trpc = useTRPC();
    const [params]= useWorkflowParams();

    return useSuspenseQuery(trpc.workflow.getMany.queryOptions(params))
}

export const useCreateWorkflow=()=>{

    const router = useRouter();
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    return useMutation(
        trpc.workflow.create.mutationOptions({
            onSuccess : (data)=>{
                toast.success(`workflow ${data.id} created`)
                queryClient.invalidateQueries(
                    trpc.workflow.getMany.queryOptions({})
                )
            },
            onError : (error)=>{
                toast.error(`failed to create workflow : ${error.message}`)
            }
        })
    )
}

export const useRemoveWorkflow=()=>{
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(
        trpc.workflow.remove.mutationOptions({
            onSuccess : (data)=>{
                toast.success(`workflows ${data.name} removed`)
                queryClient.invalidateQueries(trpc.workflow.getMany.queryOptions({}))
                queryClient.invalidateQueries(
                    trpc.workflow.getOne.queryFilter({ id : data.id })
                )
            }
        })
    )
}

export const useSuspenseWorkflow=(id : string)=>{
    const trpc = useTRPC()
    return useSuspenseQuery(trpc.workflow.getOne.queryOptions({ id }))
}

export const useUpdateWorkflowName=()=>{
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(
        trpc.workflow.updateName.mutationOptions({
            onSuccess : (data)=>{
                toast.success(`workflows ${data.name} Updated`)
                queryClient.invalidateQueries(trpc.workflow.getMany.queryOptions({}))
                queryClient.invalidateQueries(trpc.workflow.getOne.queryOptions({ id : data.id }))
            },
            onError : (error)=>{
                toast.error(`Failed to update workflow : ${error.message}`)
            }
        })
    )
}