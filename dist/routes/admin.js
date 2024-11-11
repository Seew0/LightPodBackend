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
const express_1 = __importDefault(require("express"));
const adminAuth_1 = __importDefault(require("../middleware/adminAuth"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const admin_1 = require("../db/admin");
const app = express_1.default.Router();
// Login route
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const resp = yield (0, admin_1.adminLogin)(email, password);
        if (!resp) {
            throw new Error("no admin account");
        }
        res.status(200).json({ "message": "authorised", "token": resp });
    }
    catch (error) {
        res.status(404).json({ "message": error.message });
    }
}));
// Get price
app.get("/getPrice", adminAuth_1.default, (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.COSTPERLEAD) {
            throw new Error("no price set");
        }
        res.status(200).json({ "resp": process.env.COSTPERLEAD });
    }
    catch (error) {
        res.status(404).json({ "error": error.message });
    }
}));
// Change price
app.post("/changePrice", adminAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { newPrice } = req.body;
        if (isNaN(newPrice) || !newPrice) {
            throw new Error("Invalid price");
        }
        process.env.COSTPERLEAD = newPrice.toString();
        const envFilePath = path_1.default.resolve(__dirname, '../.env');
        if (!fs_1.default.existsSync(envFilePath)) {
            throw new Error(".env file not found");
        }
        let envFileContent = fs_1.default.readFileSync(envFilePath, 'utf8');
        const newEnvFileContent = envFileContent.replace(/(^|\n)COSTPERLEAD=.*/, `$1COSTPERLEAD=${newPrice}`);
        fs_1.default.writeFileSync(envFilePath, newEnvFileContent);
        res.status(200).json({ "resp": "updated price" });
    }
    catch (error) {
        res.status(400).json({ "error": error.message });
    }
}));
// Get all users
app.get("/getAllUsers", adminAuth_1.default, (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield (0, admin_1.getAllUsers)();
        res.status(200).json({ resp });
    }
    catch (error) {
        res.status(404).json({ "message": error.message });
    }
}));
app.get("/getAllApikeys", adminAuth_1.default, (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield (0, admin_1.getAllApikeys)();
        res.status(200).json({ resp });
    }
    catch (error) {
        res.status(404).json({ "message": error.message });
    }
}));
app.post("/generateAPIkey", adminAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.body;
        const resp = yield (0, admin_1.generateAPIkey)(userID);
        if (!resp) {
            throw new Error("failed to generate key");
        }
        res.status(200).json({ resp });
    }
    catch (error) {
        res.status(404).json({ "message": error.message });
    }
}));
app.post("/getAPIkey", adminAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.body;
        const resp = yield (0, admin_1.getApiKey)(userID);
        if (!resp) {
            throw new Error("this account do not have APIKEY access");
        }
        res.status(200).json({ resp });
    }
    catch (error) {
        res.status(404).json({ "message": error.message });
    }
}));
app.post("/revokeAPIkey", adminAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.body;
        const resp = yield (0, admin_1.revokeAPIkey)(userID);
        if (!resp) {
            throw new Error("failed to revoke key");
        }
        res.status(200).json({ resp });
    }
    catch (error) {
        res.status(404).json({ "message": error.message });
    }
}));
// Update credits
app.post("/updateCredits", adminAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, credits } = req.body;
        const resp = yield (0, admin_1.updateCredits)(userID, credits);
        if (resp === "negative") {
            throw new Error("credits cannot be negative");
        }
        if (!resp) {
            throw new Error("failed to update credits");
        }
        res.status(200).json({ resp });
    }
    catch (error) {
        res.status(400).json({ "message": error.message });
    }
}));
// Get user by ID
app.get("/getUser", adminAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.body;
        const data = yield (0, admin_1.getUserById)(userID);
        if (!data) {
            throw new Error("user not found");
        }
        res.status(200).json({ data });
    }
    catch (error) {
        res.status(404).json({ "message": error.message });
    }
}));
exports.default = app;
