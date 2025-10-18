'use client';

import { CreditCardIcon, FolderOpenIcon, LogOutIcon, StarIcon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useSubscriptionStatus } from "@/features/subscriptions/use-subcription";


const menuItems = [
    {
        title : 'Home',
        items : [
            {
                title : 'workflows',
                icon : FolderOpenIcon,
                url : '/workflows'
            },
            {
                title : 'credentials',
                icon : FolderOpenIcon,
                url : '/credentials'
            },
            {
                title : 'executions',
                icon : FolderOpenIcon,
                url : '/executions'
            },
            
        ]
    }
]

export const AppSidebar=()=>{

    const router = useRouter();
    const pathname = usePathname();
    const { hasActiveSubscription, isLoading, plan } = useSubscriptionStatus();

    function Subscription(){
        if (isLoading) {
            return (
              <SidebarMenuItem>
                <SidebarMenuButton disabled className="gap-x-4 h-10 px-4 opacity-50">
                  <StarIcon className="h-4 w-4 animate-pulse" />
                  <span>Loading...</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
        }
        if(hasActiveSubscription) return null;

        return (
            <SidebarMenuItem>
                <SidebarMenuButton tooltip='Update to Pro' className="gap-x-4 h-10 px-4" onClick={()=>authClient.checkout({slug : 'rnr-Pro'})}>
                    <StarIcon className="h-4 w-4"/>
                    <span>Update to Pro</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
    }

    return (
            <Sidebar collapsible="icon">
                    <SidebarHeader>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild className="gap-x-3 h-10 px-4 flex items-center">
                                <Link href='/   ' prefetch>
                                <Image alt='rnr' src='/Logo/companylogo.svg' width={40} height={40}/>
                                <span className="text-xl flex items-center text-neutral-800">rnr</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarHeader>
                <SidebarContent>
                {menuItems.map((group)=>(
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((items)=>(
                                    <SidebarMenuItem key={items.title}>
                                        <SidebarMenuButton
                                            tooltip={items.title}
                                            isActive={
                                                items.url === '/' ? pathname === '/' : pathname.startsWith(items.url)
                                            }
                                            asChild
                                            className='gap-x-4 h-10 px-4'
                                        >
                                            <Link href={items.url} prefetch>
                                                <items.icon className="size-4"/>
                                                <span>{items.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                        <Subscription/>
                        <SidebarMenuItem>
                        <SidebarMenuButton tooltip='Billing Portal' className="gap-x-4 h-10 px-4" onClick={()=>authClient.customer.portal()}>
                            <CreditCardIcon className="h-4 w-4"/>
                            <span>Billing Portal</span>
                        </SidebarMenuButton>
                        <SidebarMenuButton tooltip='Logout' className="gap-x-4 h-10 my-0.5 px-4" onClick={()=>authClient.signOut({
                            fetchOptions : {
                                onSuccess : ()=>{
                                    router.push('/login')
                                }
                            }
                        })}>
                            <LogOutIcon/>
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}