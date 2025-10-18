import { prefetchWorkflow } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-untils";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { WorkflowContainer, WorkflowsList } from "@/features/workflows/components/workflows";

const Page =async()=>{

    await requireAuth();
    prefetchWorkflow();

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