
import Docker from 'dockerode';
import { containerMap } from './containerMap';  // Import the container map

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

interface ContainerDetails {
  Id: string;
  NetworkSettings: {
    Ports: {
      [port: string]: { HostPort: string }[];
    };
  };
}

export const runContainer = async (imageName: string, userId: string, productId: string): Promise<ContainerDetails> => {
  try {
    const container = await docker.createContainer({
      Image: imageName,
      ExposedPorts: { "6901/tcp": {} },
      HostConfig: {
        PortBindings: {
          "6901/tcp": [{ HostPort: "0" }]
        }
      }
    });

    await container.start();

    // Inspect the container to get the running details
    const details: ContainerDetails = await container.inspect();
    const port = details.NetworkSettings.Ports["6901/tcp"][0]?.HostPort;

    if (port) {
      // Map the container to the user
      containerMap.addContainer(userId, container.id, productId, port);
    }

    return details;
  } catch (error: any) {
    console.error(`Error running container: ${error.message}`);
    throw error;
  }
};

export const stopContainer = async (containerId: string, userId: string): Promise<void> => {
  try {
    const container = docker.getContainer(containerId);
    await container.stop();
    await container.remove();  // Optionally remove the container after stopping
    containerMap.removeContainer(userId, containerId);  // Remove from the map
    console.log(`Container ${containerId} stopped and removed.`);
  } catch (error: any) {
    console.error(`Error stopping container ${containerId}: ${error.message}`);
    throw error;
  }
};

export const removeIdleContainers = async (): Promise<void> => {
  const IDLE_TIMEOUT_MS = 30 * 60 * 1000;  // Set idle timeout (e.g., 30 minutes)

  try {
    const containers = await docker.listContainers({ all: true });
    const now = Date.now();

    for (const containerInfo of containers) {
      const container = docker.getContainer(containerInfo.Id);

      // Calculate how long the container has been running
      const createdTime = new Date(containerInfo.Created * 1000).getTime();
      const runningTime = now - createdTime;

      if (runningTime > IDLE_TIMEOUT_MS) {
        console.log(`Removing idle container: ${containerInfo.Id}`);
        await container.stop();
        await container.remove();

        // Remove from the map using the new method
        const userId = containerMap.getUserIdByContainerId(containerInfo.Id);
        if (userId) {
          containerMap.removeContainer(userId, containerInfo.Id);
        }
      }
    }
  } catch (error: any) {
    console.error(`Error removing idle containers: ${error.message}`);
    throw error;
  }
};
