import { RegisterFrom } from "@/features/auth/components/register-form";
import { requireUnauth } from "@/lib/auth-untils";

const Page=async()=>{
    await requireUnauth();
    
    return  <RegisterFrom/>;
}

export default Page;