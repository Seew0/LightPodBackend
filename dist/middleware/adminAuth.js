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
Object.defineProperty(exports, "__esModule", { value: true });
const admindb_1 = require("../db/admindb");
const adminVerification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            throw new Error("Authorization header missing");
        }
        const accessToken = authHeader.split("Bearer ")[1];
        if (!accessToken) {
            throw new Error("Token missing");
        }
        if (yield admindb_1.adminAuth.has(accessToken)) {
            next();
        }
        else {
            throw new Error("Unauthorized");
        }
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.default = adminVerification;
