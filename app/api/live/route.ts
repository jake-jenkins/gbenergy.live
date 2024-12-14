import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const usage = await prisma.gridLive.findMany({
        orderBy: {
            UPDATE: 'desc',
        },
        take: 1,
    })
    return Response.json(usage[0])
}