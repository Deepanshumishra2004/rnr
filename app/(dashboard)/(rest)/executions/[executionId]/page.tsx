interface PageProps {
    params : Promise<{
        executionId : string;
    }>
}

//http://localhost:3000/executions/2131312

const Page=async({ params }:PageProps)=>{

    const {executionId} = await params;

    return <p>execution Id : {executionId}</p>
}

export default Page;