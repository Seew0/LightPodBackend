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
exports.adminLogin = adminLogin;
exports.getAllUsers = getAllUsers;
exports.generateAPIkey = generateAPIkey;
exports.getAllApikeys = getAllApikeys;
exports.getApiKey = getApiKey;
exports.updateCredits = updateCredits;
exports.getUserById = getUserById;
exports.revokeAPIkey = revokeAPIkey;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const admindb_1 = require("./admindb");
const prisma = new client_1.PrismaClient();
function adminLogin(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield prisma.admin.findUnique({
            where: {
                email: email,
                password: password
            },
        });
        if (!data) {
            return null;
        }
        const token = (0, uuid_1.v4)();
        yield admindb_1.adminAuth.set(token, data === null || data === void 0 ? void 0 : data.email);
        return token;
    });
}
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield prisma.user.findMany();
        return data;
    });
}
function generateAPIkey(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = (0, uuid_1.v4)();
        const data = yield prisma.user.update({
            where: {
                UserID: userID
            },
            data: {
                apikey: key
            }
        });
        return data;
    });
}
function getAllApikeys() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield prisma.user.findMany({
            select: {
                apikey: true
            }
        });
        return data;
    });
}
function getApiKey(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield prisma.user.findUnique({
            where: {
                UserID: userID
            }
        });
        console.log(data);
        return data === null || data === void 0 ? void 0 : data.apikey;
    });
}
function updateCredits(userID, credits) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const data = yield prisma.user.findUnique({
            where: {
                UserID: userID
            }
        });
        if (!data) {
            return null;
        }
        const updatedCredits = ((_a = data.credits) !== null && _a !== void 0 ? _a : 0) + credits;
        if (updatedCredits < 0) {
            return "negative";
        }
        const updatedData = yield prisma.user.update({
            where: {
                UserID: userID
            },
            data: {
                credits: updatedCredits
            }
        });
        if (!updatedData) {
            return null;
        }
        return updatedData;
    });
}
function getUserById(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield prisma.user.findUnique({
            where: {
                UserID: userID
            }
        });
        return data;
    });
}
function revokeAPIkey(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield prisma.user.update({
            where: {
                UserID: userID
            },
            data: {
                apikey: null
            }
        });
        return data;
    });
}
