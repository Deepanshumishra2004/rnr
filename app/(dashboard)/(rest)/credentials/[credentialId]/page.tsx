interface PageProps {
    params : Promise<{
        credentialId : string;
    }>
}

//http://localhost:3000/credentials/123131

const Page=async({ params }:PageProps)=>{

    const {credentialId} = await params;

    return <p>credientials Id : {credentialId}</p>
}

export default Page;