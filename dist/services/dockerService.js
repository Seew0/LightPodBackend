"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeIdleContainers = exports.stopContainer = exports.runContainer = void 0;
const dockerode_1 = __importDefault(require("dockerode"));
const containerMap_1 = require("./containerMap"); // Import the container map
const docker = new dockerode_1.default({ socketPath: '/var/run/docker.sock' });
const runContainer = (imageName, userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const container = yield docker.createContainer({
            Image: imageName,
            ExposedPorts: { "6901/tcp": {} },
            Env: [
                'VNC_PW=password'
            ],
            HostConfig: {
                PortBindings: {
                    "6901/tcp": [{ HostPort: "0" }]
                },
                ShmSize: 536870912, // 512m in bytes
                AutoRemove: true
            }
        });
        yield container.start();
        // Inspect the container to get the running details
        const details = yield container.inspect();
        const port = (_a = details.NetworkSettings.Ports["6901/tcp"][0]) === null || _a === void 0 ? void 0 : _a.HostPort;
        if (port) {
            // Map the container to the user
            containerMap_1.containerMap.addContainer(userId, container.id, productId, port);
        }
        return details;
    }
    catch (error) {
        console.error(`Error running container: ${error.message}`);
        throw error;
    }
});
exports.runContainer = runContainer;
const stopContainer = (containerId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const container = docker.getContainer(containerId);
        yield container.stop();
        // await container.remove();  // Optionally remove the container after stopping
        containerMap_1.containerMap.removeContainer(userId, containerId); // Remove from the map
        console.log(`Container ${containerId} stopped and removed.`);
    }
    catch (error) {
        console.error(`Error stopping container ${containerId}: ${error.message}`);
        throw error;
    }
});
exports.stopContainer = stopContainer;
const removeIdleContainers = () => __awaiter(void 0, void 0, void 0, function* () {
    const IDLE_TIMEOUT_MS = 30 * 60 * 1000; // Set idle timeout (e.g., 30 minutes)
    try {
        const containers = yield docker.listContainers({ all: true });
        const now = Date.now();
        for (const containerInfo of containers) {
            const container = docker.getContainer(containerInfo.Id);
            // Calculate how long the container has been running
            const createdTime = new Date(containerInfo.Created * 1000).getTime();
            const runningTime = now - createdTime;
            if (runningTime > IDLE_TIMEOUT_MS) {
                console.log(`Removing idle container: ${containerInfo.Id}`);
                yield container.stop();
                // await container.remove();
                // Remove from the map using the new method
                const userId = containerMap_1.containerMap.getUserIdByContainerId(containerInfo.Id);
                if (userId) {
                    containerMap_1.containerMap.removeContainer(userId, containerInfo.Id);
                }
            }
        }
    }
    catch (error) {
        console.error(`Error removing idle containers: ${error.message}`);
        throw error;
    }
});
exports.removeIdleContainers = removeIdleContainers;
