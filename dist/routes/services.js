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
const express_1 = require("express");
const dockerService_1 = require("../services/dockerService");
const supabaseAuth_1 = __importDefault(require("../middleware/supabaseAuth"));
const router = (0, express_1.Router)();
// POST route to start a Docker container and redirect to its exposed port
router.post('/start-container', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { imageName, userId, productId } = req.body;
    try {
        const container = yield (0, dockerService_1.runContainer)(imageName, userId, productId);
        const port = (_a = container.NetworkSettings.Ports["6901/tcp"][0]) === null || _a === void 0 ? void 0 : _a.HostPort;
        if (port) {
            const redirectUrl = `https://localhost:${port}?containerId=${container.Id}&userId=${userId}&productId=${productId}`;
            res.status(200).json(Object.assign({ redirectUrl }, container));
        }
        else {
            res.status(500).send('No exposed port found.');
        }
    }
    catch (error) {
        res.status(500).send(`Error starting container: ${error.message}`);
    }
}));
// POST route to stop a running container
router.post('/stop-container', supabaseAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { containerId, userId } = req.body;
    try {
        yield (0, dockerService_1.stopContainer)(containerId, userId);
        res.status(200).send(`Container ${containerId} stopped and removed.`);
    }
    catch (error) {
        res.status(500).send(`Error stopping container: ${error.message}`);
    }
}));
exports.default = router;
