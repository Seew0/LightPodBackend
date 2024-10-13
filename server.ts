import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes/index';
import { removeIdleContainers } from './services/dockerService';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routes);

app.get("/health", async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: "server is healthy" });
});

// Set up a periodic cleanup for idle containers (every 10 minutes)
setInterval(() => {
  removeIdleContainers()
    .then(() => console.log('Idle container cleanup completed.'))
    .catch((error) => console.error('Idle container cleanup failed:', error));
}, 10 * 60 * 1000);  // Run cleanup every 10 minutes

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
