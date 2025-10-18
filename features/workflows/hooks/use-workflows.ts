import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSuspenseHook=()=>{
    const trpc = useTRPC();

    return useSuspenseQuery(trpc.workflow.getMany.queryOptions())
}

export const useCreateWorkflow=()=>{

    const router = useRouter();
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    return useMutation(
        trpc.workflow.create.mutationOptions({
            onSuccess : (data)=>{
                toast.success(`workflow ${data.id} created`)
                // router.push(`workflow/${data.id}`)
                queryClient.invalidateQueries(
                    trpc.workflow.getMany.queryOptions()
                )
            },
            onError : (error)=>{
                toast.error(`failed to create workflow : ${error.message}`)
            }
        })
    )
}