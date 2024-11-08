import express, { Request, Response } from 'express';
import { createUser, getUser, updateUserName, deleteUser } from '../db/user';
import verifySessionToken from '../middleware/supabaseAuth';
import dotenv from 'dotenv';
dotenv.config();

const app = express.Router();

app.post("/register", verifySessionToken, async (req: Request, res: Response): Promise<void> => {
    try {
        const userID = (req as any).user.id;
        const email = (req as any).user.email;
        const { name } = req.body;
        const user = await createUser(name, userID, email);

        if (!user) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        res.status(200).json({ message: "User created successfully", user });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/getUser", verifySessionToken, async (req: Request, res: Response): Promise<void> => {
    try {
        const userID = (req as any).user.id;
        const user = await getUser(userID);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({ user });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/updateUserName", verifySessionToken, async (req: Request, res: Response): Promise<void> => {
    try {
        const userID = (req as any).user.id;
        const { name} = req.body;
        const user = await updateUserName(name, userID);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({ message: "User name updated successfully", user });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/deleteUser", verifySessionToken, async (req: Request, res: Response): Promise<void> => {
    try {
        const userID = (req as any).user.id;
        const user = await deleteUser(userID);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default app;

