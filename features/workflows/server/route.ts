import { PAGINATION } from "@/config/constants";
import prisma from "@/lib/db";
import { createTRPCRouter, preminumProcedure, ProtectedProcedure } from "@/trpc/init";
import { NodeType } from "@prisma/client";
import { generateSlug } from 'random-word-slugs';
import z from "zod";
import { Node, Edge } from "@xyflow/react";

export const workflowsRouter = createTRPCRouter({

    create : preminumProcedure
    .mutation(({ctx})=>{
        return prisma.workflow.create({
            data : {
                name : generateSlug(3),
                userId : ctx.auth.user.id,
                nodes : {
                    createMany : {
                        data : [
                        {
                            type : NodeType.INITAL,
                            position : { x : 0, y : 0 },
                            name : NodeType.INITAL,
                        },
                        {
                            type : NodeType.INITAL,
                            position : { x : 0, y : 200 },
                            name : NodeType.INITAL,
                        }]
                    }
                }
            }
        })
    }),

    remove : preminumProcedure
    .input(z.object({ id : z.string() }))
    .mutation(({ ctx , input })=>{
        return prisma.workflow.delete({
            where : {
                id : input.id,
                userId : ctx.auth.user.id
            }
        })
    }),


    updateName : preminumProcedure
    .input(z.object({id : z.string(), name : z.string().min(1)}))
    .mutation(({ ctx, input })=>{
        return prisma.workflow.update({
            where : {
                id : input.id,
                userId : ctx.auth.user.id
            },
            data : {
                name : input.name
            }
        })
    }),


    getOne : preminumProcedure
    .input(z.object({ id : z.string() }))
    .query(async({ctx , input})=>{
        const workflow = await prisma.workflow.findUniqueOrThrow({
            where : { id : input.id, userId : ctx.auth.user.id },
            include : { nodes : true, connection : true }
        })

        //Tranform sever nodes to react-flow compatible nodes
        const nodes : Node[] = workflow.nodes.map((node)=>({
            id : node.id,
            type : node.type,
            position : node.position as { x : number, y : number },
            data : (node.data as Record<string, unknown>) || {}
        }))

        const edges : Edge[] = workflow.connection.map((connection)=>({
            id : connection.id,
            source : connection.fromNodeId,
            target : connection.toNodeId,
            sourceHandle : connection.fromOutput,
            targetHandle : connection.toInput
        }))

        return {
            id : workflow.id,
            name : workflow.name,
            nodes,
            edges
        }
    }),

    getMany : ProtectedProcedure
    .input(
        z.object({
            page : z.number().default(PAGINATION.DEFAULT_PAGE),
            pageSize : z.number().min(PAGINATION.DEFAULT_MIN_SIZE).max(PAGINATION.DEFAULT_MAX_SIZE).default(PAGINATION.DEFAULT_PAGE_SIZE),
            search : z.string().default('')
        })
    )
    .query(async({ ctx, input })=>{

        const { page, pageSize, search } = input;
        const [items, totalCount]= await Promise.all([
            prisma.workflow.findMany({
                skip : (page -1)*pageSize,
                take : pageSize,
                where : {
                    userId : ctx.auth.user.id,
                    name : {
                        contains : search,
                        mode : 'insensitive'
                    }
                },
                orderBy:{
                    updatedAt : 'desc'
                }
            }),
            prisma.workflow.count({
                where : {
                    userId : ctx.auth.user.id,
                    name : {
                        contains : search,
                        mode : 'insensitive'
                    }
                },
           })
        ])

        const totalPages = Math.ceil(totalCount/pageSize); 
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;

        return {
            page,
            pageSize,
            search,
            items,
            totalCount,
            totalPages,
            hasNextPage,
            hasPreviousPage
        }
    })
})