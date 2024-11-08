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
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("../db/index"));
dotenv_1.default.config();
const verifySessionToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            throw new Error("Authorization header missing");
        }
        const sessionToken = authHeader.split("Bearer ")[1];
        if (!sessionToken) {
            throw new Error("Token missing or malformed");
        }
        const { data, error } = yield index_1.default.auth.getUser(sessionToken);
        if (error || !data.user) {
            throw new Error("Unauthorized");
        }
        req.user = data.user;
        next();
    }
    catch (e) {
        res.status(401).json({ message: e.message });
    }
});
exports.default = verifySessionToken;
