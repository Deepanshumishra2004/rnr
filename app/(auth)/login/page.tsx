import { LoginFrom } from "@/features/auth/components/login-form";
import { requireUnauth } from "@/lib/auth-untils";

const Page=async()=>{

    await requireUnauth();

    return <div>
        <LoginFrom/>
    </div>
}

export default Page;