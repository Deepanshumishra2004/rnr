import Image from "next/image"
import Link from "next/link"

const AuthLayout=({children}:{children : React.ReactNode})=>{

    return (
        <div className="bg-muted flex flex-col min-h-svh justify-center items-center gap-6 p-6 md:p-10">
             <div className="flex flex-col w-full max-w-sm gap-6">
                <Link href='/' className="flex items-center self-center gap-x-3">
                    <Image alt='rnr' src='/Logo/companylogo.svg' width={60} height={60}/>
                    <span className="text-3xl flex items-center text-neutral-800">rnr</span>
                </Link>
                {children}
             </div>
        </div>
    )
}

export default AuthLayout;