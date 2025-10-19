import { AppHeader } from "@/components/app-header";

const Layout=({children}:{children : React.ReactNode})=>{

    return <>
    <AppHeader/>
        <div className="flex h-full">{children}</div>
    </>
}

export default Layout;