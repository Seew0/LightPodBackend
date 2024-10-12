
import { Router, Request, Response } from 'express';
import { runContainer, stopContainer } from '../services/dockerService';
import verifySessionToken from '../middleware/supabaseAuth';

const router = Router();

// POST route to start a Docker container and redirect to its exposed port
router.post('/start-container', verifySessionToken, async (req: Request, res: Response) => {
    const { imageName, userId, productId } = req.body;
    try {
        const container = await runContainer(imageName, userId, productId);
        const port = container.NetworkSettings.Ports["6901/tcp"][0]?.HostPort;

        if (port) {
            // Redirect with userId and productId as parameters
            res.redirect(`http://localhost:${port}?containerId=${container.Id}&userId=${userId}&productId=${productId}`);
        } else {
            res.status(500).send('No exposed port found.');
        }
    } catch (error: any) {
        res.status(500).send(`Error starting container: ${error.message}`);
    }
});

// POST route to stop a running container
router.post('/stop-container', verifySessionToken, async (req: Request, res: Response) => {
    const { containerId, userId } = req.body;
    try {
        await stopContainer(containerId, userId);
        res.status(200).send(`Container ${containerId} stopped and removed.`);
    } catch (error: any) {
        res.status(500).send(`Error stopping container: ${error.message}`);
    }
});

export default router;
