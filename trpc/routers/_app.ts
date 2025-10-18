import { inngest } from '@/inngest/client';
import { baseProcedure, createTRPCRouter, preminumProcedure, ProtectedProcedure } from '../init';
import prisma from '@/lib/db';
import { google } from "@ai-sdk/google";
import { generateText } from 'ai';

export const appRouter = createTRPCRouter({

  textAi: preminumProcedure.mutation(async()=>{
    await inngest.send({
      name : 'execute/ai'
    })

    return { success : true, message : 'job queued'}
  }),

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