interface ContainerInfo {
  containerId: string;
  productId: string;
  port: string;
}

class ContainerMap {
  private userContainerMap: Map<string, ContainerInfo[]> = new Map();

  // Add a new container for a user
  addContainer(userId: string, containerId: string, productId: string, port: string): void {
    const containerInfo: ContainerInfo = { containerId, productId, port };
    if (!this.userContainerMap.has(userId)) {
      this.userContainerMap.set(userId, []);
    }
    this.userContainerMap.get(userId)!.push(containerInfo);
  }

  // Remove a container for a user
  removeContainer(userId: string, containerId: string): void {
    if (this.userContainerMap.has(userId)) {
      const containers = this.userContainerMap.get(userId);
      this.userContainerMap.set(
        userId,
        containers!.filter(container => container.containerId !== containerId)
      );
    }
  }

  // Get all containers for a user
  getContainersForUser(userId: string): ContainerInfo[] {
    return this.userContainerMap.get(userId) || [];
  }

  // Get all users and their containers
  getAllUsers(): Map<string, ContainerInfo[]> {
    return this.userContainerMap;
  }


  // Add this method to find userId by containerId
  getUserIdByContainerId(containerId: string): string | undefined {
    for (const [userId, containers] of this.userContainerMap.entries()) {
      const container = containers.find(c => c.containerId === containerId);
      if (container) {
        return userId;
      }
    }
    return undefined;
  }
}

export const containerMap = new ContainerMap();
