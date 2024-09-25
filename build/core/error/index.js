"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runtimeError = exports.responseError = void 0;
const responseError_1 = __importDefault(require("./responseError"));
exports.responseError = responseError_1.default;
const runtimeError_1 = __importDefault(require("./runtimeError"));
exports.runtimeError = runtimeError_1.default;
