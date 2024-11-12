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
const user_1 = require("../db/user");
const supabaseAuth_1 = __importDefault(require("../middleware/supabaseAuth"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express_1.default.Router();
app.post("/register", supabaseAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.user.id;
        const email = req.user.email;
        const { fullName, phoneNumber, location } = req.body;
        const user = yield (0, user_1.createUser)(fullName, phoneNumber, location, userID, email);
        if (!user) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        res.status(200).json({ message: "User created successfully", user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
app.get("/getUser", supabaseAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.user.id;
        const user = yield (0, user_1.getUser)(userID);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
app.post("/addCredits", supabaseAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { credits } = req.body;
        const userID = req.user.id;
        const state = yield (0, user_1.addCredits)(credits, userID);
        if (!state) {
            res.status(400).json({ message: "Failed to add credits" });
            return;
        }
        res.status(200).json({ message: `Credits added successfully balance: ${state.credits}` });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
app.get("/getCredits", supabaseAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.user.id;
        const user = yield (0, user_1.getUser)(userID);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ credits: user.credits });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.default = app;
