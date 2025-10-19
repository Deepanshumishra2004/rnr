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