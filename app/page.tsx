'use client';

import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-untils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Home=()=>{

  const trpc = useTRPC();
  const queryclient = useQueryClient();

  const  { data } = useQuery(trpc.getWorkflow.queryOptions())
  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess : () =>{
      queryclient.invalidateQueries(trpc.getWorkflow.queryOptions())
      toast.success('job queued')
    }
  }))

  return <div className="min-h-screen min-w-sc flex justify-center items-center flex-col gap-6">
    <h1>
      protected server session
    </h1>
      {JSON.stringify(data, null, 2)}
      <Button disabled={create.isPending} onClick={()=>create.mutate()}>
        Create Workflow
      </Button>
      <LogoutButton/>
  </div>
}

export default Home;
