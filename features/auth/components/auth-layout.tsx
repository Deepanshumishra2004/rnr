import Image from "next/image"
import Link from "next/link"

const AuthLayout=({children}:{children : React.ReactNode})=>{

    return (
        <div className="bg-muted flex flex-col min-h-svh justify-center items-center gap-6 p-6 md:p-10">
             <div className="flex flex-col w-full max-w-sm gap-6">
                <Link href='/' className="flex items-center self-center gap-2">
                    <Image alt="brand" src="/Logo/company.svg" width={100} height={50}/>
                </Link>
                {children}
             </div>
        </div>
    )
}

export default AuthLayout;