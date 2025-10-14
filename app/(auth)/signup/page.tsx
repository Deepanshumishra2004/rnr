import { RegisterFrom } from "@/features/auth/components/register-form";
import { requireUnauth } from "@/lib/auth-untils";

const Page=async()=>{

    await requireUnauth();
    
    return (
        <div>
            <RegisterFrom/>
        </div>
    )
}

export default Page;