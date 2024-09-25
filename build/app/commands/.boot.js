"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hello_1 = __importDefault(require("./Hello"));
const TestCommand_1 = __importDefault(require("./TestCommand"));
exports.default = {
    Hello: Hello_1.default,
    TestCommand: TestCommand_1.default,
};
