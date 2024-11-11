"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const admin_1 = __importDefault(require("./admin"));
const services_1 = __importDefault(require("./services"));
const app = express_1.default.Router();
app.use("/user", user_1.default);
app.use("/services", services_1.default);
app.use("/admin", admin_1.default);
//servicesss
exports.default = app;
