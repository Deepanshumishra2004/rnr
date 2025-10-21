import { InitalNode } from "@/components/initial-node";
import { NodeType } from "@prisma/client";
import { NodeTypes } from "@xyflow/react";

export const nodeComponents={
    [NodeType.INITAL] : InitalNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents