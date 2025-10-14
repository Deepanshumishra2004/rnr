import { Button } from "@/components/ui/button";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Client } from "./client";
import { getQueryClient, trpc } from "@/trpc/server";


const Home=async()=>{
 
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions())

  return <div className="h-screen flex justify-center items-center">
    <Button variant="destructive">Click me</Button>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Client/>
    </HydrationBoundary>
  </div>
}

export default Home;
