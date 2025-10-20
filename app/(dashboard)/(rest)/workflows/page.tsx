import { prefetchWorkflow } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-untils";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { SearchParams } from "nuqs";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";
import { 
    WorkflowContainer, 
    WorkflowLoading, 
    WorkflowsList,
    WorkflowError
} from "@/features/workflows/components/workflows";

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
                <ErrorBoundary fallback={<WorkflowError/>}>
                    <Suspense fallback={<WorkflowLoading/>}>
                        <WorkflowsList/>
                    </Suspense>
                </ErrorBoundary>
            </HydrateClient>
        </WorkflowContainer>
    )
}

export default Page;