import { requireAuth } from "@/lib/auth-untils";

const Page=async()=>{

    await requireAuth();
    
    return <p>credientials</p>
}

export default Page;