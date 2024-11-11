import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { adminAuth } from '../db/admindb';
import { createUser, deleteUser, getUser, updateUserName } from '../db/user';
import verifySessionToken from '../middleware/adminAuth';
dotenv.config();

const app = express.Router();

app.post("/register", async (req: Request, res: Response): Promise<void> => {
    try {
        // const userID = (req as any).user.id;
        const { name, email } = req.body;
        const user = await createUser(name, email);

        if (!user) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        res.status(200).json({ message: "User created successfully", user });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/login", async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;

        const token = await adminAuth.get(email);
        console.log(token);
        if (!token) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({ message: "User logged in successfully", userID: token });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/getUser", verifySessionToken, async (req: Request, res: Response): Promise<void> => {
    try {
        const userID = (req as any).id;
        console.log(userID);
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
        const userID = (req as any).id;
        const { name } = req.body;
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
        const userID = (req as any).id;
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

