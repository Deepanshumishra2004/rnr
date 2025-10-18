import { authClient } from "@/lib/auth-client"
import { useQuery } from "@tanstack/react-query"

export const useSubscription=()=>{
    return useQuery({
        queryKey : ['subscription'],
        queryFn : async ()=>{
            const { data } = await authClient.customer.state(); 
            return data;
        }
    })
}

export const useSubscriptionStatus=()=>{
    const {data, isLoading, isError} = useSubscription();

    const hasActiveSubscription = !!data?.activeSubscriptions.length
    const plan = data?.activeSubscriptions?.[0] ?? null;

    return {
        hasActiveSubscription,
        plan,
        isLoading,
        isError
    }
}