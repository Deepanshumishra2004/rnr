import { SidebarTrigger } from "./ui/sidebar"

export const AppHeader=()=>{

    return (
        <header className="border-b h-14 gap-2 flex px-4 shrink-0 items-center bg-background">
            <SidebarTrigger/>
        </header>
    )
}