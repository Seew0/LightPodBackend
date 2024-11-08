"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containerMap = void 0;
class ContainerMap {
    constructor() {
        this.userContainerMap = new Map();
    }
    // Add a new container for a user
    addContainer(userId, containerId, productId, port) {
        const containerInfo = { containerId, productId, port };
        if (!this.userContainerMap.has(userId)) {
            this.userContainerMap.set(userId, []);
        }
        this.userContainerMap.get(userId).push(containerInfo);
    }
    // Remove a container for a user
    removeContainer(userId, containerId) {
        if (this.userContainerMap.has(userId)) {
            const containers = this.userContainerMap.get(userId);
            this.userContainerMap.set(userId, containers.filter(container => container.containerId !== containerId));
        }
    }
    // Get all containers for a user
    getContainersForUser(userId) {
        return this.userContainerMap.get(userId) || [];
    }
    // Get all users and their containers
    getAllUsers() {
        return this.userContainerMap;
    }
    // Add this method to find userId by containerId
    getUserIdByContainerId(containerId) {
        for (const [userId, containers] of this.userContainerMap.entries()) {
            const container = containers.find(c => c.containerId === containerId);
            if (container) {
                return userId;
            }
        }
        return undefined;
    }
}
exports.containerMap = new ContainerMap();
