import { Request, Response, Router } from 'express';
import verifySessionToken from "../middleware/supabaseAuth";
import { deleteLog, getAllUserLogs, getLog } from '../db/log';

const app = Router();

app.post("/getLog", verifySessionToken, async (req: Request, res: Response): Promise<void> => {
    try {
        const userID = (req as any).user.id;
        const { logId } = req.body;
        const log = await getLog(logId);

        if (!log) {
            res.status(404).json({ message: "Log not found" });
            return;
        }

        res.status(200).json({ log });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/getAllUserLogs", verifySessionToken, async (req: Request, res: Response): Promise<void> => {
    try {
        const userID = (req as any).user.id;
        const logs = await getAllUserLogs(userID);

        res.status(200).json({ logs });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/deleteLog", verifySessionToken, async (req: Request, res: Response): Promise<void> => {
    try {
        const userID = (req as any).user.id;
        const { logId } = req.body;
        const log = await deleteLog(logId);

        if (!log) {
            res.status(404).json({ message: "Log not found" });
            return;
        }

        res.status(200).json({ message: "Log deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});


export default app;