import { prefetchWorkflow } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-untils";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { WorkflowContainer, WorkflowsList } from "@/features/workflows/components/workflows";
import { SearchParams } from "nuqs";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";

type Props = {
    searchParams : Promise<SearchParams>;
}

const Page =async({searchParams}:Props)=>{

    await requireAuth();

    const params = await workflowsParamsLoader(searchParams);
    prefetchWorkflow(params);

    return (
        <WorkflowContainer>
            <HydrateClient>
                <ErrorBoundary fallback={<p>Error!</p>}>
                    <Suspense fallback={<p>Loading...</p>}>
                        <WorkflowsList/>
                    </Suspense>
                </ErrorBoundary>
            </HydrateClient>
        </WorkflowContainer>
    )
}

export default Page;