"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class runtimeError extends Error {
    constructor(message, data = null) {
        super(message);
        this.message = message;
        this.data = data;
    }
}
exports.default = runtimeError;
