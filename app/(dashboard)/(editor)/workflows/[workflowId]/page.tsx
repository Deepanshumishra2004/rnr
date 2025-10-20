import { Editor, EditorError, EditorLoading } from "@/features/editor/components/editor";
import { EditorHeader } from "@/features/editor/components/editor-header";
import { WorkflowError, WorkflowLoading } from "@/features/workflows/components/workflows";
import { prefetchWorkflow } from "@/features/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
    params : Promise<{ workflowId : string; }>
}

//http://localhost:3000/workflows/123131

const Page=async({ params }:PageProps)=>{

    const {workflowId} = await params;
    prefetchWorkflow(workflowId)

    return (
        <HydrateClient>
            <ErrorBoundary fallback={<EditorError/>}>
                <Suspense fallback={<EditorLoading/>}>
                <EditorHeader workflowId={workflowId}/>
                <main className="flex-1">
                <Editor workflowId={workflowId}/>
                </main>
                </Suspense>
            </ErrorBoundary>
        </HydrateClient>
    )
}

export default Page;