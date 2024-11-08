import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createLog(
    logId: string,
    userId: string,
    containerID : string,
    name: string,
){
    try {
        const log = await prisma.logs.create({
            data: {
                LogID: logId,
                userID: userId,
                containerID: containerID,
                Name: name,
            },
        });

        return log;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getLog(logId: string) {
    try {
        const log = await prisma.logs.findUnique({
            where: {
                LogID: logId,
            },
        });
        return log || null;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getAllUserLogs(userId: string) {
    try {
        const logs = await prisma.logs.findMany({
            where: {
                userID: userId,
            },
        });
        return logs;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteLog(logId: string) {
    try {
        const log = await prisma.logs.delete({
            where: {
                LogID: logId,
            },
        });
        return log;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateTerminateTime(logId:string){
    try {
        const log = await prisma.logs.update({
            where: {
                LogID: logId,
            },
            data: {
                TerminateTime: new Date(),
            },
        });
        return log;
    } catch (error: any) {
        throw new Error(error.message);
    }
}