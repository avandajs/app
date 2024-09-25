"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../core/app");
const database_1 = __importDefault(require("./database"));
const config = {
    connection: (0, app_1.Connection)(database_1.default),
    port: 8000,
    rootPath: '/',
    CORSWhitelist: ['http://localhost:3000']
};
exports.default = config;
