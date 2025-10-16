import { AppHeader } from "@/components/app-header";

const Layout=({children}:{children : React.ReactNode})=>{

    return <>
    <AppHeader/>
        <div>{children}</div>
    </>
}

export default Layout;