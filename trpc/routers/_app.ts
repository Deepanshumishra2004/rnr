import { WorkflowsRouter } from '@/features/workflows/server/route';
import { createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
  workflow : WorkflowsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;