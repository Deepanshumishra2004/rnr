interface PageProps {
    params : Promise<{
        workflowId : string;
    }>
}

//http://localhost:3000/workflows/123131

const Page=async({ params }:PageProps)=>{

    const {workflowId} = await params;

    return <p>workflow Id : {workflowId}</p>
}

export default Page;