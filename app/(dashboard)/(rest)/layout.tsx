import { AppHeader } from "@/components/app-header";

const Layout=({children}:{children : React.ReactNode})=>{

    return <>
    <AppHeader/>
        <div className="flex h-full bg-accent">{children}</div>
    </>
}

export default Layout;