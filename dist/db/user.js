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
exports.createUser = createUser;
exports.getUser = getUser;
exports.addCredits = addCredits;
exports.removeCredits = removeCredits;
exports.getCredits = getCredits;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createUser(fullName, phoneNumber, location, userID, email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.create({
                data: {
                    UserID: userID,
                    email: email,
                    name: fullName,
                    phoneNumber: phoneNumber,
                    location: location,
                    credits: 0,
                },
            });
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
function getUser(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
                where: {
                    UserID: userID,
                },
            });
            return user || null;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
function addCredits(addCreds, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let data = yield prisma.user.findUnique({
                where: {
                    UserID: userId,
                },
            });
            if (!data) {
                return null;
            }
            const updatedCred = ((_a = data.credits) !== null && _a !== void 0 ? _a : 0) + Math.abs(addCreds);
            data = yield prisma.user.update({
                where: {
                    UserID: userId,
                },
                data: {
                    credits: updatedCred,
                },
            });
            return data;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
function removeCredits(removeCreds, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let data = yield prisma.user.findUnique({
                where: {
                    UserID: userId,
                },
            });
            if (!data) {
                return null;
            }
            const updatedCred = ((_a = data.credits) !== null && _a !== void 0 ? _a : 0) - Math.abs(removeCreds);
            data = yield prisma.user.update({
                where: {
                    UserID: userId,
                },
                data: {
                    credits: updatedCred,
                },
            });
            return data;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
function getCredits(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield prisma.user.findUnique({
                where: {
                    UserID: userID,
                },
            });
            return data ? data.credits : null;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
