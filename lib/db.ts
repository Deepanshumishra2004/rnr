import { PrismaClient } from "@prisma/client";

const globalprisma = global as unknown as  {
    prisma : PrismaClient;
}

const prisma = globalprisma.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production'){
    globalprisma.prisma = prisma;
}

export default prisma;