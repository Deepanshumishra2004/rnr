import { LoginFrom } from "@/features/auth/components/login-form";
import { requireUnauth } from "@/lib/auth-untils";
import Image from "next/image";
import Link from "next/link";

const Page=async()=>{

    await requireUnauth();
    
    return <LoginFrom/>;
}

export default Page;