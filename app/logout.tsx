'use client'

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export const LogoutButton=()=>{

    const router = useRouter();

    return (
        <Button
            variant={'default'}
            onClick={async () => {
                await authClient.signOut();
                router.push('/Login');
            }}
        >
            Logout
        </Button>
    )
}