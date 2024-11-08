import { PrismaClient, User } from '@prisma/client';
import { v4 } from 'uuid';

const prisma = new PrismaClient();

export async function createUser(
    fullName: string,
    userID: string,
    email: string
): Promise<User | null> {
    try {
        const user = await prisma.user.create({
            data: {
                UserID: userID,
                email: email,
                name: fullName,
                apikey: v4()
            },
        });

        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getUser(userID: string): Promise<User | null> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                UserID: userID,
            },
        });
        return user || null;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateUserName(name: string, userID: string): Promise<User | null> {
    try {
        const user = await prisma.user.update({
            where: {
                UserID: userID,
            },
            data: {
                name: name,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }

}

export async function deleteUser(userID: string): Promise<User | null> {
    try {
        const user = await prisma.user.delete({
            where: {
                UserID: userID,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
}