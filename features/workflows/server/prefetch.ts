import { prefetch, trpc } from "@/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

type Input = inferInput<typeof trpc.workflow.getMany>;

// prefetch all workflows

export const prefetchWorkflow=( params : Input )=>{
    return prefetch(trpc.workflow.getMany.queryOptions(params));
}