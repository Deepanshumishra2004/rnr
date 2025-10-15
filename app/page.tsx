import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-untils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";

const Home=async()=>{

  await requireAuth()

  const data = await caller.getUsers();
  
  return <div className="min-h-screen min-w-sc flex justify-center items-center flex-col gap-6">
    <h1>
      protected server session
    </h1>
      {JSON.stringify(data)}
      <LogoutButton/>
  </div>
}

export default Home;
