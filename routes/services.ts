import { Router, Request, Response } from 'express';
import { runContainer, stopContainer } from '../services/dockerService';
import verifySessionToken from '../middleware/adminAuth';
import {createLog, updateTerminateTime} from "../db/log"
import { generateSlug } from '../util/slugCreater';

const app = Router();

// POST route to start a Docker container and redirect to its exposed port
app.post('/start-container', verifySessionToken, async (req: Request, res: Response) => {
    const userId = (req as any).id;
    const { imageName, productId } = req.body;
    try {
        const container = await runContainer(imageName, userId, productId);
        const port = container.NetworkSettings.Ports["6901/tcp"][0]?.HostPort;

        if (port) {
            const redirectUrl = `https://localhost:${port}?containerId=${container.Id}&userId=${userId}&productId=${productId}`;
            const containerName = generateSlug()
            const log = await createLog(container.Id, userId,container.Id,containerName)
            res.status(200).json({ redirectUrl, ...container, message:`log created ${log.LogID}` });
        } else {
            res.status(500).send('No exposed port found.');
        }
    } catch (error: any) {
        res.status(500).send(`Error starting container: ${error.message}`);
    }
});

// POST route to stop a running container
app.post('/stop-container', verifySessionToken, async (req: Request, res: Response) => {
    const userId = (req as any).id;
    const { LogID } = req.body;
    try {
        await stopContainer(LogID, userId);
        await updateTerminateTime(LogID);
        res.status(200).send(`Container ${LogID} stopped and removed.`);
    } catch (error: any) {
        res.status(500).send(`Error stopping container: ${error.message}`);
    }
});

export default app;
