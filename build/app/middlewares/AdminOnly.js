"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminOnly {
    boot(res, req) {
        return true;
    }
}
exports.default = AdminOnly;
