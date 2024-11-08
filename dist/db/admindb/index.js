"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const quick_db_1 = require("quick.db");
exports.adminAuth = new quick_db_1.QuickDB({
    filePath: "./db/admindb/admindb.sqlite"
});
