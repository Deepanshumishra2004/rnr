'use client';

import { CreditCardIcon, FolderOpenIcon, LogOutIcon, StarIcon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";


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

    return (
            <Sidebar collapsible="icon">
                    <SidebarHeader>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
                                <Link href='/   ' prefetch>
                                <Image alt='rnr' src='/Logo/company.svg' width={100} height={30}/>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarHeader>
                <SidebarContent>
                {menuItems.map((group)=>(
                    <SidebarGroup>
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
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip='Update to Pro' className="gap-x-4 h-10 px-4" onClick={()=>{}}>
                            <StarIcon className="h-4 w-4"/>
                            <span>Update to Pro</span>
                        </SidebarMenuButton>
                        <SidebarMenuButton tooltip='Billing Portal' className="gap-x-4 h-10 px-4" onClick={()=>{}}>
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