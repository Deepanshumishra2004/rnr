import { inngest } from '@/inngest/client';
import { createTRPCRouter, ProtectedProcedure } from '../init';
import prisma from '@/lib/db';
export const appRouter = createTRPCRouter({
  getWorkflow : ProtectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany()
  }),
  createWorkflow : ProtectedProcedure.mutation(async() => {
      await inngest.send({
        name : "test/hello.world",
        data : {
          email : 'deimaria@gmail.com',
        },
      });
      return { success:true , messsage : 'job queued' }
  })
});
// export type definition of API
export type AppRouter = typeof appRouter; 