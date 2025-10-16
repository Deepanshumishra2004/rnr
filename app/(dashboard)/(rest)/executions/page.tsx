import { requireAuth } from "@/lib/auth-untils";

const Page=async()=>{

    await requireAuth();

    return <p>Executions</p>
}

export default Page;