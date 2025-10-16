import { requireAuth } from "@/lib/auth-untils";

const Page =async()=>{

    await requireAuth();
    
    return <p>workflows</p>
}

export default Page;